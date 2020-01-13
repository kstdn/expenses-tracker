import { Injectable } from '@angular/core';
import { MoneyMovement } from '../models/MoneyMovement';
import { ServerService } from './server.service';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, tap, finalize } from 'rxjs/operators';
import { MoneyMovementGroups } from '../models/MoneyMovementGroup';
import { groupMovementsBy, addToExistingGroupOrCreate, removeFromGroup, updateInGroup, isInInterval, formatMoney } from '../helpers/util';
import { DateInterval } from '../components/shared/month-picker/DateInterval';

@Injectable({
  providedIn: 'root'
})
export class MovementsService {

  changes$: BehaviorSubject<void> = new BehaviorSubject(null);

  loadingGroups: boolean = true;

  interval: DateInterval;
  groupBy: keyof MoneyMovement = 'timestamp';

  movementGroups: MoneyMovementGroups;

  constructor(
    private serverService: ServerService
  ) { }

  refreshMovements() {
    this.movementGroups = undefined;
    return this.getAllMoneyMovementGroups$()
      .subscribe({
        next: result => this.movementGroups = result,
        error: error => console.log('Error getting movements')
      });
  }

  setDateInterval(interval: DateInterval) {
    this.interval = interval;
    this.refreshMovements();
    this.changes$.next();
  }

  setGroupingCriteria(groupBy: keyof MoneyMovement) {
    this.groupBy = groupBy;
    this.refreshMovements();
    this.changes$.next();
  }

  private getAllMovements$(interval: DateInterval): Observable<MoneyMovement[]> {
    return this.serverService.getAllMovements(interval);
  }

  getAllMoneyMovementGroups$(): Observable<MoneyMovementGroups> {
    if (this.movementGroups) {
      return of(this.movementGroups);
    }

    this.loadingGroups = true;
    return this.getAllMovements$(this.interval)
      .pipe(
        finalize(() => this.loadingGroups = false),
        map(data => groupMovementsBy(data, this.groupBy))
      );
  }

  addMovement$(movement: MoneyMovement) {
    return this.serverService.addMovement(movement)
      .pipe(tap(movement => {
        if(isInInterval(movement, this.interval)) {
          addToExistingGroupOrCreate(this.movementGroups, this.groupBy, movement)
        }
        this.changes$.next();
      }));
  }

  updateMovement$(movement: MoneyMovement) {
    return this.serverService.updateMovement(movement)
      .pipe(tap(updatedMovement => {
        updateInGroup(this.movementGroups, this.groupBy, updatedMovement, this.interval)
        this.changes$.next();
      }));
  }

  deleteMovement$(movement: MoneyMovement): Observable<void> {
    return this.serverService.deleteMovement(movement.id)
      .pipe(tap(() => { 
        removeFromGroup(this.movementGroups, this.groupBy, movement);
        this.changes$.next();
      }));
  }

  getCurrentBalance$(): Observable<string> {
    return this.serverService.getCurrentBalance()
      .pipe(
        map(balance => formatMoney(balance))
      )
  }

  getAccumulatedCurrentBalance$(): Observable<string> {
    return this.serverService.getCurrentBalance()
      .pipe(
        map(balance => formatMoney(balance))
      )
  }
}
