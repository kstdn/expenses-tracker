import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store'; 
import { AutoUnsubscribe, takeWhileAlive } from 'take-while-alive';
import { tap } from 'rxjs/operators';

@Component({
  templateUrl: './timepoints.component.html',
  styleUrls: ['./timepoints.component.scss']
})
@AutoUnsubscribe()
export class TimepointsComponent implements OnInit {

  timepointOptions = Array.from(Array(31).keys()).map(k => k+1);

  selectedTimepoints: number[] = [];

  constructor(
    private store: Store<fromStore.TimepointsState>
  ) { }

  ngOnInit() {
    this.store.select(fromStore.selectTimepoints)
      .pipe(
        takeWhileAlive(this),
        tap(timepoints => this.selectedTimepoints = timepoints)
      ).subscribe();
  }

  isSelected(number: number) {
    return this.selectedTimepoints.includes(number);
  }

  toggle(number: number) {
    if(this.isSelected(number)) {
      this.selectedTimepoints = this.selectedTimepoints.filter(n => n !== number);
    } else {
      this.selectedTimepoints = [
        ...this.selectedTimepoints,
        number
      ]
    }
  }

}
