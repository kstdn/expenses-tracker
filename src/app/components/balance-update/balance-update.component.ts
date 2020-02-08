import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MovementsService } from 'src/app/services/movements.service';
import { ServerService } from 'src/app/services/server.service';
import { SimpleMoney } from 'src/app/models/SimpleMoney';
import { formatMoney, Money } from 'src/app/helpers/util';
import { takeWhileAlive, AutoUnsubscribe } from 'take-while-alive';
import { finalize, tap } from 'rxjs/operators';
import { Currency } from 'dinero.js';
import { MoneyMovement } from 'src/app/models/MoneyMovement';
import { MoneyMovementType } from 'src/app/models/MoneyMovementType';

@Component({
  selector: 'app-balance-update',
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
    private movementsService: MovementsService,
    public dialogRef: MatDialogRef<BalanceUpdateComponent>
  ) { }

  ngOnInit() {
    this.loading = true;
    this.serverService.getCurrentBalance()
      .pipe(
        takeWhileAlive(this),
        finalize(() => this.loading = false)
      )
      .subscribe(balance => {
        this.currentBalance = balance;
        this.currentBalanceFormatted = formatMoney(balance);
      })
  }

  getInitialMoney() {
    return this.currentBalance;
  }

  onMoneyChanged(money: SimpleMoney): void {
    const diff = Money(money).subtract(Money(this.currentBalance));
    
    if(diff.isZero()) {
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
      timestamp: new Date().getTime(),
      type: MoneyMovementType.Immediate,
      description: ''
    }

    this.loading = true;
    this.movementsService.addMovement$(movement)
    .pipe(
      takeWhileAlive(this),
      tap(() => this.remove())
    )
    .subscribe();
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
