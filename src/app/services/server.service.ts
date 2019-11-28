import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MoneyMovement } from '../models/MoneyMovement';
import { MoneyMovementType } from '../models/MoneyMovementType';
import { SimpleMoney } from '../models/SimpleMoney';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  baseUrl: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getAllMovements(): Observable<MoneyMovement[]> {
    return this.http.get<MoneyMovement[]>(this.baseUrl + 'expenses');
  }

  addMovement(
    amount: number,
    date: Date,
    type: MoneyMovementType,
    description?: string
  ): Observable<MoneyMovement> {
    return this.http.post<MoneyMovement>(this.baseUrl + 'expenses', {
      amount,
      date,
      type,
      description
    });
  }

  getCurrentBalance(): Observable<SimpleMoney> {
    return this.http.get<SimpleMoney>(this.baseUrl + 'expenses/balance');
  }

}
