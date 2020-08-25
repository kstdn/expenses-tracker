import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MoneyMovement } from '../models/MoneyMovement';
import { SimpleMoney } from '../models/SimpleMoney';
import { DateInterval } from '../components/shared/month-picker/DateInterval';
import { Paginated } from '../models/Paginated';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  baseUrl: string = 'http://localhost:4000/';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<void> {
    return this.http.post<void>(this.baseUrl + 'authentication/login', {
        username,
        password,
    });
  }

  getAllMovements(interval: DateInterval): Observable<Paginated<MoneyMovement>> {
    return this.http.get<Paginated<MoneyMovement>>(this.baseUrl + 'money-movements', {
      params: {
        from: `${interval.from.toISOString()}`,
        to: `${interval.to.toISOString()}`
      }
    });
  }

  addMovement(movement: MoneyMovement): Observable<MoneyMovement> {
    return this.http.post<MoneyMovement>(this.baseUrl + 'money-movements', movement);
  }

  updateMovement(movement: MoneyMovement): Observable<MoneyMovement> {
    return this.http.put<MoneyMovement>(this.baseUrl + 'money-movements', movement);
  }

  deleteMovement(id: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + 'money-movements/' + id);
  }

  getCurrentBalance(): Observable<SimpleMoney> {
    return this.http.get<SimpleMoney>(this.baseUrl + 'money-movements/balance');
  }

  getAccumulatedCurrentBalance(): Observable<SimpleMoney> {
    return this.http.get<SimpleMoney>(this.baseUrl + 'money-movements/balance-accumulated');
  }

}
