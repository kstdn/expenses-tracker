import { Component, OnInit } from '@angular/core';
import { MovementsService } from './services/movements.service';
import { takeWhileAlive, AutoUnsubscribe } from 'take-while-alive';
import { MoneyMovementCrudComponent } from './components/money-movement-crud/money-movement-crud.component';
import { DialogsService } from './services/dialogs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
@AutoUnsubscribe()
export class AppComponent implements OnInit {
  balance = '';

  constructor(
    private movementsService: MovementsService,
    private dialogsService: DialogsService
  ) { }

  ngOnInit() {
    this.movementsService.changes$
      .pipe(takeWhileAlive(this))
      .subscribe(() => this.refreshBalance())
  }

  refreshBalance() {
    this.movementsService.getCurrentBalance$()
      .pipe(takeWhileAlive(this))
      .subscribe({
        next: balance => this.balance = balance
      })
  }

  addMovement(): void {
    this.dialogsService.openMovementCrud();
  }
}
