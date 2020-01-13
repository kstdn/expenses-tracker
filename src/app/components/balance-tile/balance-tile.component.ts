import { Component, OnInit } from '@angular/core';
import { MovementsService } from 'src/app/services/movements.service';
import { AutoUnsubscribe, takeWhileAlive } from 'take-while-alive';
import { DialogsService } from 'src/app/services/dialogs.service';

@Component({
  selector: 'balance-tile',
  templateUrl: './balance-tile.component.html',
  styleUrls: ['./balance-tile.component.scss']
})
@AutoUnsubscribe()
export class BalanceTileComponent implements OnInit {

  text = '';

  constructor(
    private movementsService: MovementsService,
    private dialogsService: DialogsService
  ) { }

  ngOnInit() {
    this.movementsService.changes$
      .pipe(takeWhileAlive(this))
      .subscribe(() =>
        setTimeout(() => this.refreshBalance(), 1000))
  }

  refreshBalance() {
    this.text = 'Loading...';
    this.movementsService.getCurrentBalance$()
      .pipe(takeWhileAlive(this))
      .subscribe({
        next: balance => this.text = balance
      })
  }

  enterNewBalance() {
    this.dialogsService.openBalanceUpdate();
  }

}
