import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MoneyMovement } from '../models/MoneyMovement';
import { MoneyMovementType } from '../models/MoneyMovementType';
import { SimpleMoney } from '../models/SimpleMoney';
import { MoneyMovementGroup, MoneyMovementGroups } from '../models/MoneyMovementGroup';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  baseUrl: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getAllMovements(): Observable<MoneyMovement[]> {
    return this.http.get<MoneyMovement[]>(this.baseUrl + 'expenses');
  }

  getAllMovementGroups(): Observable<MoneyMovementGroups> {
    return this.http.get<MoneyMovementGroups>(this.baseUrl + 'expenses/groups');
  }

  addMovement(
    amount: number,
    timestamp: string,
    type: MoneyMovementType,
    description?: string
  ): Observable<MoneyMovement> {
    return this.http.post<MoneyMovement>(this.baseUrl + 'expenses', {
      amount,
      timestamp,
      type,
      description
    });
  }

  updateMovement(
    id: string,
    amount: number,
    timestamp: string,
    type: MoneyMovementType,
    description: string) {
    return this.http.put<MoneyMovement>(this.baseUrl + 'expenses/' + id, {
      amount,
      timestamp,
      type,
      description
    });
  }

  getCurrentBalance(): Observable<SimpleMoney> {
    return this.http.get<SimpleMoney>(this.baseUrl + 'expenses/balance');
  }

}
