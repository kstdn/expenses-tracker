import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MoneyMovement } from '../models/MoneyMovement';
import { SimpleMoney } from '../models/SimpleMoney';
import { DateInterval } from '../components/shared/month-picker/DateInterval';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  baseUrl: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getAllMovements(interval: DateInterval): Observable<MoneyMovement[]> {
    return this.http.get<MoneyMovement[]>(this.baseUrl + 'expenses', {
      params: {
        from: `${interval.from.getTime()}`,
        to: `${interval.to.getTime()}`
      }
    });
  }

  addMovement(movement: MoneyMovement): Observable<MoneyMovement> {
    return this.http.post<MoneyMovement>(this.baseUrl + 'expenses', movement);
  }

  updateMovement(movement: MoneyMovement): Observable<MoneyMovement> {
    return this.http.put<MoneyMovement>(this.baseUrl + 'expenses', movement);
  }
  
  deleteMovement(id: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + 'expenses/' + id);
  }

  getCurrentBalance(): Observable<SimpleMoney> {
    return this.http.get<SimpleMoney>(this.baseUrl + 'expenses/balance');
  }

  getAccumulatedCurrentBalance(): Observable<SimpleMoney> {
    return this.http.get<SimpleMoney>(this.baseUrl + 'expenses/balance-accumulated');
  }

}
