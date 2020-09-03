import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Currency } from 'dinero.js';
import { finalize } from 'rxjs/operators';
import { formatMoney, Money } from 'src/app/helpers/util';
import { MoneyMovementType } from 'src/app/models/MoneyMovementType';
import { State } from 'src/app/services/state.service';
import { AutoUnsubscribe } from 'take-while-alive';
import { CreateMoneyMovementDto } from '../../models/dto/create-money-movement.dto';

type BalanceUpdateComponentInput = {
  currentBalance: number,
  accountId: string;
  currency: Currency;
}

@Component({
  selector: 'et-balance-update',
  templateUrl: './balance-update.component.html',
  styleUrls: ['./balance-update.component.scss']
})
@AutoUnsubscribe()
export class BalanceUpdateComponent implements OnInit {

  currentBalanceFormatted: string;

  newMovementAmount: number;
  newMovementFormatted: string;
  newMovementType: string;

  loading = false;

  constructor(
    public dialogRef: MatDialogRef<BalanceUpdateComponent>,
    private state: State,
    @Optional() @Inject(MAT_DIALOG_DATA) public input: BalanceUpdateComponentInput
  ) { }

  ngOnInit() {
    this.currentBalanceFormatted = formatMoney(this.input.currentBalance, this.input.currency);
  }

  getInitialMoney() {
    return this.input.currentBalance;
  }

  onMoneyChanged(amount: number): void {
    const manualyEntered = Money(amount, this.input.currency);
    const current = Money(this.input.currentBalance, this.input.currency);
    const diff = manualyEntered.subtract(current);

    if (diff.isZero()) {
      this.unsetDiff();
    } else {
      this.setDiff(diff);
    }
  }

  get submitIsActive() {
    return this.newMovementAmount !== undefined;
  }

  submit() {
    const movement: CreateMoneyMovementDto = {
      accountId: this.input.accountId,
      amount: this.newMovementAmount,
      timestamp: new Date(),
      type: MoneyMovementType.Immediate,
      description: ''
    }

    this.loading = true;

    this.state.addMovement$(movement)
      .pipe(
        finalize(() => this.remove())
      ).subscribe();
  }

  setDiff(diff) {
    this.newMovementAmount = diff.getAmount();
    this.newMovementFormatted = formatMoney(this.newMovementAmount, this.input.currency);
    this.newMovementType = diff.isNegative() ? 'Expence' : 'Income';
  }

  unsetDiff() {
    this.newMovementAmount = undefined;
    this.newMovementFormatted = undefined;
    this.newMovementType = undefined;
  }

  remove() {
    this.dialogRef.close();
  }

}
