import { Component, OnInit, ElementRef } from '@angular/core';
import { AutoUnsubscribe, takeWhileAlive } from 'take-while-alive';
import { MoneyMovementGroups } from 'src/app/models/MoneyMovementGroup';
import { MovementsService } from 'src/app/services/movements.service';
import { DateInterval } from '../shared/month-picker/DateInterval';

@Component({
  selector: 'app-money-movements',
  templateUrl: './money-movements.component.html',
  styleUrls: ['./money-movements.component.scss']
})
@AutoUnsubscribe()
export class MoneyMovementsComponent implements OnInit {

  get moneyMovementGroups(): MoneyMovementGroups {
    return this.movementsService.movementGroups;
  };

  get loading() {
    return this.movementsService.loadingGroups;
  }

  error: boolean = false;

  constructor(
    private movementsService: MovementsService,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.movementsService.changes$
      .pipe(takeWhileAlive(this))
      .subscribe(() => {
        setTimeout(() => {
          this.elementRef.nativeElement.scrollTop = this.elementRef.nativeElement.scrollHeight;
        })
      })
  }

  onIntervalChange(interval: DateInterval) {
    this.movementsService.setDateInterval(interval);
  }

}
