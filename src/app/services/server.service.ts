import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DateInterval } from '../components/shared/month-picker/DateInterval';
import { Account } from '../models/Account';
import { CreateAccountDto } from '../models/dto/create-account.dto';
import { CreateMoneyMovementDto } from '../models/dto/create-money-movement.dto';
import { MoneyMovement } from '../models/MoneyMovement';
import { Paginated } from '../models/Paginated';
import { Timepoint } from '../models/Timepoint';

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

  addAccount(account: CreateAccountDto): Observable<Account> {
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

  addMovement(movement: CreateMoneyMovementDto): Observable<MoneyMovement> {
    return this.http.post<MoneyMovement>(this.baseUrl + 'money/movements', movement);
  }

  updateMovement(movement: MoneyMovement): Observable<MoneyMovement> {
    return this.http.patch<MoneyMovement>(this.baseUrl + 'money/movements/' + movement.id, movement);
  }

  deleteMovement(id: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + 'money/movements/' + id);
  }

  getAccountBalance(accountId: string): Observable<number> {
    return this.http.get<number>(this.baseUrl + 'money/accounts/' + accountId + '/balance');
  }

  getTimepoints(accountId: string): Observable<Timepoint[]> {
    return this.http.get<Timepoint[]>(this.baseUrl + 'money/accounts/' + accountId + '/timepoints');
  }

  updateTimepoints(dates: number[], accountId: string): Observable<Timepoint[]> {
    return this.http.post<Timepoint[]>(this.baseUrl + 'money/accounts/' + accountId + '/timepoints', {
      dates
    });
  }

}
