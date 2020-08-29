import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MoneyMovementCrudComponent } from '../components/money-movement-crud/money-movement-crud.component';
import { MoneyMovement } from '../models/MoneyMovement';
import { BalanceUpdateComponent } from '../components/balance-update/balance-update.component';
import { Account } from '../models/Account';
import { AccountCrudComponent } from '../components/account-crud/account-crud.component';

@Injectable({
  providedIn: 'root'
})
export class DialogsService {

  constructor(
    public dialog: MatDialog
  ) { }

  openAccountCrud(account?: Account) {
    return this.dialog.open(AccountCrudComponent, {
      width: '450px',
      data: account
    });
  }

  openMovementCrud(movement?: MoneyMovement) {
    return this.dialog.open(MoneyMovementCrudComponent, {
      width: '450px',
      data: movement
    });
  }

  openBalanceUpdate(accountId: string) {
    this.dialog.open(BalanceUpdateComponent, {
      data: accountId,
      width: '450px'
    });
  }
}
