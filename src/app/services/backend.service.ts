import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { MoneyMovement } from '../models/MoneyMovement';
import { mockData } from './mock';
import { MoneyMovementGroup } from '../models/MoneyMovementGroup';
import * as groupBy from 'lodash.groupby';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(
    private serverService: ServerService
  ) { }

  getAllMoneyMovements$(): Observable<MoneyMovement[]> {
    return of(mockData);
  }

  getAllMoneyMovementGroups$(): Observable<MoneyMovementGroup[]> {
    const data = this.serverService.getAllMovements();
    return of(groupBy(data, 'date'));
  }
}
