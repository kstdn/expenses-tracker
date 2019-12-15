import { Component, OnInit } from '@angular/core';
import { MovementsService } from './services/movements.service';
import { takeWhileAlive, AutoUnsubscribe } from 'take-while-alive';
import { DialogsService } from './services/dialogs.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { DateInterval } from './components/shared/month-picker/DateInterval';

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
    private dialogsService: DialogsService,
    private iconLibrary: FaIconLibrary
  ) { }

  ngOnInit() {
    this.movementsService.changes$
      .pipe(takeWhileAlive(this))
      .subscribe(() => this.refreshBalance())

    this.iconLibrary.addIcons(faChevronLeft, faChevronRight)
  }

  refreshBalance() {
    this.movementsService.getCurrentBalance$()
      .pipe(takeWhileAlive(this))
      .subscribe({
        next: balance => this.balance = balance
      })
  }

  onIntervalChange(interval: DateInterval) {
    // console.log(interval)
  }

  enterNewBalance() {
    
  }

  addMovement(): void {
    this.dialogsService.openMovementCrud();
  }
}
