import { Component, OnInit, ElementRef } from '@angular/core';
import { AutoUnsubscribe, takeWhileAlive } from 'take-while-alive';
import { finalize } from 'rxjs/operators';
import { MoneyMovementGroup, MoneyMovementGroups } from 'src/app/models/MoneyMovementGroup';
import { MovementsService } from 'src/app/services/movements.service';

@Component({
  selector: 'app-money-movements',
  templateUrl: './money-movements.component.html',
  styleUrls: ['./money-movements.component.scss']
})
@AutoUnsubscribe()
export class MoneyMovementsComponent implements OnInit {

  moneyMovementGroups: MoneyMovementGroups = {};

  loading: boolean = false;
  error: boolean = false;

  constructor(
    private movementsService: MovementsService,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.movementsService.changes$
      .pipe(takeWhileAlive(this))
      .subscribe(() => {
        this.getData();
        setTimeout(() => {
          this.elementRef.nativeElement.scrollTop = this.elementRef.nativeElement.scrollHeight;
        })
      })
  }

  getData() {
    this.loading = true;
    this.error = false;
    this.movementsService.getAllMoneyMovementGroups$()
      .pipe(
        takeWhileAlive(this),
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: data => {
          this.moneyMovementGroups = data
        },
        error: err => this.error = true
      });
  }

}
