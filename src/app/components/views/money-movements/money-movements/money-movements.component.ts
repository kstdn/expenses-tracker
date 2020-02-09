import { Component, OnInit, ElementRef } from '@angular/core';
import { AutoUnsubscribe } from 'take-while-alive';
import { DateInterval } from '../../../shared/month-picker/DateInterval';
import { Store } from '@ngrx/store';
import * as fromStore from 'src/app/store';
import { tap } from 'rxjs/operators';
import { hasOnlyOneGroup } from 'src/app/helpers/util';

@Component({
  selector: 'app-money-movements',
  templateUrl: './money-movements.component.html',
  styleUrls: ['./money-movements.component.scss']
})
@AutoUnsubscribe()
export class MoneyMovementsComponent implements OnInit {

  error: boolean = false;

  loading$ = this.store.select(fromStore.selectMoneyMovementGroupsLoading);
  loaded$ = this.store.select(fromStore.selectMoneyMovementGroupsLoaded);
  moneyMovementGroups$ = this.store.select(fromStore.selectMoneyMovementGroups)
    .pipe(tap(() => {
      setTimeout(() => {
        this.elementRef.nativeElement.scrollTop = this.elementRef.nativeElement.scrollHeight;
      })
    }));

  hasOnlyOneGroup = hasOnlyOneGroup;

  constructor(
    private elementRef: ElementRef,
    private store: Store<fromStore.State>
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.store.dispatch(fromStore.cleanUpMovementGroups());
  }

  onIntervalChange(interval: DateInterval) {
    this.store.dispatch(fromStore.setMovementsInterval({
      data: interval
    }))
  }
}
