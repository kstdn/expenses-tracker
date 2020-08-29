import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { DateInterval } from '../components/shared/month-picker/DateInterval';
import { formatMoney, groupMovementsBy, isInInterval, removeFromGroup, updateInGroup } from '../helpers/util';
import { EntityState, LoadingStatus } from '../models/EntityStatus';
import { MoneyMovement } from '../models/MoneyMovement';
import { MoneyMovementGroups } from '../models/MoneyMovementGroup';
import * as fromStore from './../store';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class MovementsService {

  load$: Subject<DateInterval> = new Subject();

  interval: DateInterval;
  groupBy: keyof MoneyMovement = 'timestamp';

  state: EntityState<MoneyMovementGroups> = {
    status: LoadingStatus.Idle,
    item: {},
  };

  constructor(
    private serverService: ServerService,
    private store: Store<fromStore.State>
  ) {
    store.select(fromStore.selectMoneyMovementInterval)
      .subscribe(value => this.interval = value);
  }

  setDateInterval(interval: DateInterval) {
    this.interval = interval;
  }

  setGroupingCriteria(groupBy: keyof MoneyMovement) {
    this.groupBy = groupBy;
  }

  loadMovements$(accountId: string) {
    return this.load$.pipe(
      tap(() => this.state.status = LoadingStatus.Loading),
      switchMap((interval) =>
        this.serverService.getAllMovements(accountId, interval).pipe(
          map((data) => data.items),
          tap((data) => {
            if(data.length === 0) {
              this.state.status = LoadingStatus.ResolvedNotFound;
              this.state.item = {};
            } else {
              this.state.status = LoadingStatus.Resolved;
            }
          }),
          map((data) => this.state.item = groupMovementsBy(data, "timestamp")),
          tap((data) => this.interval = interval),
          catchError(e => {
            this.state.status = LoadingStatus.Rejected;
            return throwError(e);
          })
        )
      )
    );
  }

  addMovement(movement: MoneyMovement) {
    this.store.dispatch(fromStore.addMovement({ data: movement }))
  }

  updateMovement$(movement: MoneyMovement) {
    return this.serverService.updateMovement(movement)
      .pipe(tap(updatedMovement => {
        if (isInInterval(updatedMovement, this.interval)) {
          updateInGroup(this.state.item, this.groupBy, updatedMovement, this.interval)
        } else {
          removeFromGroup(this.state.item, this.groupBy, updatedMovement)
        }
      }));
  }

  deleteMovement$(movement: MoneyMovement): Observable<void> {
    return this.serverService.deleteMovement(movement.id)
      .pipe(tap(() => {
        removeFromGroup(this.state.item, this.groupBy, movement);
      }));
  }

  triggerReload(interval: DateInterval) {
    this.load$.next(interval);
  }

  getAccountBalance$(accountId: string): Observable<string> {
    return this.serverService.getAccountBalance(accountId)
      .pipe(
        map(balance => formatMoney(balance))
      )
  }
}
