import { Injectable } from '@angular/core';
import { MoneyMovement } from '../models/MoneyMovement';
import { ServerService } from './server.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as groupBy from 'lodash.groupby';
import { MoneyMovementGroup } from '../models/MoneyMovementGroup';
import { MoneyMovementType } from '../models/MoneyMovementType';
import { Money } from '../helpers/util';

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

  getAllMoneyMovementGroups$(): Observable<MoneyMovementGroup[]> {
    return this.getAllMovements$()
      .pipe(map(movements => groupBy(movements, 'date')));
  }

  addMovement(amount: number, date: Date = new Date(), type: MoneyMovementType = MoneyMovementType.Immediate, description?: string) {
    return this.serverService.addMovement(amount, date, type, description)
      .pipe(tap(() => this.changes$.next()));
  }

  getCurrentBalance$(): Observable<string> {
    return this.serverService.getCurrentBalance()
      .pipe(map(balance => Money(balance).toFormat('0.00') + 'BGN'))
  }
}
