import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Currency } from 'dinero.js';
import { finalize, tap } from 'rxjs/operators';
import { formatMoney, Money } from 'src/app/helpers/util';
import { MoneyMovement } from 'src/app/models/MoneyMovement';
import { MoneyMovementType } from 'src/app/models/MoneyMovementType';
import { SimpleMoney } from 'src/app/models/SimpleMoney';
import { ServerService } from 'src/app/services/server.service';
import * as fromStore from 'src/app/store';
import { AutoUnsubscribe, takeWhileAlive } from 'take-while-alive';

@Component({
  selector: 'et-balance-update',
  templateUrl: './balance-update.component.html',
  styleUrls: ['./balance-update.component.scss']
})
@AutoUnsubscribe()
export class BalanceUpdateComponent implements OnInit {

  currentBalance: SimpleMoney;
  currentBalanceFormatted: string;

  newMovement: SimpleMoney;
  newMovementFormatted: string;
  newMovementType: string;

  loading = true;

  constructor(
    private serverService: ServerService,
    public dialogRef: MatDialogRef<BalanceUpdateComponent>,
    private store: Store<fromStore.State>,
    private actions$: Actions,
    @Optional() @Inject(MAT_DIALOG_DATA) public accountId: string
  ) { }

  ngOnInit() {
    this.loading = true;
    this.serverService.getAccountBalance(this.accountId)
      .pipe(
        takeWhileAlive(this),
        finalize(() => this.loading = false)
      )
      .subscribe(balance => {
        this.currentBalance = balance;
        this.currentBalanceFormatted = formatMoney(balance);
      })

    this.actions$.pipe(
      ofType(fromStore.addMovementSuccess),
      takeWhileAlive(this),
      tap(_ => this.remove())
    )
      .subscribe();
  }

  getInitialMoney() {
    return this.currentBalance;
  }

  onMoneyChanged(money: SimpleMoney): void {
    const diff = Money(money).subtract(Money(this.currentBalance));

    if (diff.isZero()) {
      this.unsetDiff();
    } else {
      this.setDiff(diff);
    }
  }

  get submitIsActive() {
    return this.newMovement !== undefined;
  }

  submit() {
    const movement: MoneyMovement = {
      money: this.newMovement,
      timestamp: new Date(),
      type: MoneyMovementType.Immediate,
      description: ''
    }

    this.loading = true;

    this.store.dispatch(fromStore.addMovement({ data: movement }));
  }

  setDiff(diff) {
    this.newMovement = {
      amount: diff.getAmount(),
      currency: diff.getCurrency() as Currency,
      precision: diff.getPrecision()
    }
    this.newMovementFormatted = formatMoney(this.newMovement);
    this.newMovementType = diff.isNegative() ? 'Expence' : 'Income';
  }

  unsetDiff() {
    this.newMovement = undefined;
    this.newMovementFormatted = undefined;
    this.newMovementType = undefined;
  }

  remove() {
    this.dialogRef.close();
  }

}
