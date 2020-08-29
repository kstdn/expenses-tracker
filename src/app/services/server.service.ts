import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MoneyMovement } from '../models/MoneyMovement';
import { SimpleMoney } from '../models/SimpleMoney';
import { DateInterval } from '../components/shared/month-picker/DateInterval';
import { Paginated } from '../models/Paginated';
import { Account } from '../models/Account';

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

  refreshToken(): Observable<void> {
    return this.http.post<void>(this.baseUrl + 'authentication/refresh-token', {});
  }

  getAllAccounts(): Observable<Paginated<Account>> {
    return this.http.get<Paginated<Account>>(this.baseUrl + 'money/accounts');
  }

  addAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.baseUrl + 'money/accounts', account);
  }

  updateAccount(account: Account): Observable<Account> {
    return this.http.patch<Account>(this.baseUrl + 'money/accounts/' + account.id, account);
  }

  deleteAccount(id: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + 'money/accounts/' + id);
  }

  getAllMovements(accountId: string, interval: DateInterval): Observable<Paginated<MoneyMovement>> {
    return this.http.get<Paginated<MoneyMovement>>(this.baseUrl + `money/movements`, {
      params: {
        accountId,
        from: `${interval.from.toISOString()}`,
        to: `${interval.to.toISOString()}`
      }
    });
  }

  addMovement(movement: MoneyMovement): Observable<MoneyMovement> {
    return this.http.post<MoneyMovement>(this.baseUrl + 'money/movements', movement);
  }

  updateMovement(movement: MoneyMovement): Observable<MoneyMovement> {
    return this.http.patch<MoneyMovement>(this.baseUrl + 'money/movements/' + movement.id, movement);
  }

  deleteMovement(id: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + 'money/movements/' + id);
  }

  getAccountBalance(accountId: string): Observable<SimpleMoney> {
    return this.http.get<SimpleMoney>(this.baseUrl + 'money/accounts/' + accountId + '/balance');
  }

  getAccumulatedCurrentBalance(): Observable<SimpleMoney> {
    return this.http.get<SimpleMoney>(this.baseUrl + 'money/movements/balance-accumulated');
  }

}
