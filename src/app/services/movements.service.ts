import { Injectable } from '@angular/core';
import { MoneyMovement } from '../models/MoneyMovement';
import { ServerService } from './server.service';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MoneyMovementGroups } from '../models/MoneyMovementGroup';
import { MoneyMovementType } from '../models/MoneyMovementType';
import { Money, groupMovementsBy } from '../helpers/util';

@Injectable({
  providedIn: 'root'
})
export class MovementsService {

  changes$: BehaviorSubject<void> = new BehaviorSubject(null);

  constructor(
    private serverService: ServerService
  ) { }

  refreshMovements() {
    return this.serverService.getAllMovements();
  }

  getAllMovements$(refresh: boolean = false): Observable<MoneyMovement[]> {
    return this.serverService.getAllMovements();
  }

  getAllMoneyMovementGroupsBy$(key: keyof MoneyMovement): Observable<MoneyMovementGroups<string>> {
    return this.getAllMovements$().pipe(map(data => groupMovementsBy<string>(data, key)));
  }

  addMovement$(movement: MoneyMovement) {
    return this.serverService.addMovement(movement)
      .pipe(tap(() => this.changes$.next()));
  }

  updateMovement$(movement: MoneyMovement) {
    return this.serverService.updateMovement(movement)
      .pipe(tap(() => this.changes$.next()));
  }

  deleteMovement$(id: string): Observable<void> {
    return this.serverService.deleteMovement(id)
      .pipe(tap(() => this.changes$.next()));
  }

  getCurrentBalance$(): Observable<string> {
    return this.serverService.getCurrentBalance()
      .pipe(
        map(balance => Money(balance).toFormat('0.00') + 'BGN')
      )
  }
}
