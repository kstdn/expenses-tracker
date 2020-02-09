import { Injectable } from '@angular/core';
import { MoneyMovement } from '../models/MoneyMovement';
import { ServerService } from './server.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MoneyMovementGroups } from '../models/MoneyMovementGroup';
import { addToExistingGroupOrCreate, removeFromGroup, updateInGroup, isInInterval, formatMoney } from '../helpers/util';
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

  setDateInterval(interval: DateInterval) {
    this.interval = interval;
    this.changes$.next();
  }

  setGroupingCriteria(groupBy: keyof MoneyMovement) {
    this.groupBy = groupBy;
    this.changes$.next();
  }

  private getAllMovements$(interval: DateInterval): Observable<MoneyMovement[]> {
    return this.serverService.getAllMovements(interval);
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
        if(isInInterval(updatedMovement, this.interval)) {
          updateInGroup(this.movementGroups, this.groupBy, updatedMovement, this.interval)
        } else {
          removeFromGroup(this.movementGroups, this.groupBy, updatedMovement)
        }
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

  getAccumulatedCurrentBalance$(): Observable<string> {
    return this.serverService.getCurrentBalance()
      .pipe(
        map(balance => formatMoney(balance))
      )
  }
}
