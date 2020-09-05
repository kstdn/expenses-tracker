import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MoneyMovementCrudComponent } from '../components/money-movement-crud/money-movement-crud.component';
import { MoneyMovement } from '../models/MoneyMovement';
import { BalanceUpdateComponent } from '../components/balance-update/balance-update.component';
import { Account } from '../models/Account';
import { AccountCrudComponent } from '../components/account-crud/account-crud.component';
import { Currency } from 'dinero.js';
import { CategoryCrudComponent } from '../components/category-crud/category-crud.component';
import { Category } from '../models/Category';

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

  openCategoryCrud(category?: Category, accountId?: string) {
    return this.dialog.open(CategoryCrudComponent, {
      width: '450px',
      data: {
        category,
        accountId,
      }
    });
  }

  openMovementCrud(currency: Currency, movement?: MoneyMovement, accountId?: string) {
    return this.dialog.open(MoneyMovementCrudComponent, {
      width: '450px',
      data: {
        movement,
        accountId,
        currency,
      }
    });
  }

  openBalanceUpdate(currentBalance: number, accountId: string, currency: string) {
    this.dialog.open(BalanceUpdateComponent, {
      data: {
        currentBalance,
        accountId,
        currency
      },
      width: '450px'
    });
  }
}
