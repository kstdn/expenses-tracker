import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MovementsService } from 'src/app/services/movements.service';
import { ServerService } from 'src/app/services/server.service';
import { SimpleMoney } from 'src/app/models/SimpleMoney';
import { formatMoney } from 'src/app/helpers/util';
import { takeWhileAlive, AutoUnsubscribe } from 'take-while-alive';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-balance-update',
  templateUrl: './balance-update.component.html',
  styleUrls: ['./balance-update.component.scss']
})
@AutoUnsubscribe()
export class BalanceUpdateComponent implements OnInit {

  currentBalance: SimpleMoney;
  currentBalanceFormatted: string;

  loading = true;

  constructor(
    private serverService: ServerService,
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
    //this.amount = money && money.amount;
  }

  onIsNegativeChanged(isNegative: boolean): void {
    //this.directionId = isNegative ? 0 : 1;
  }

  get submitIsActive() {
    return true;
  }

  submit() {

  }

  remove() {
    this.dialogRef.close();
  }

}
