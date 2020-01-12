import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { addMonths, subMonths, format, startOfMonth, endOfMonth } from 'date-fns'
import { DateInterval } from './DateInterval';

@Component({
  selector: 'month-picker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.scss']
})
export class MonthPickerComponent implements OnInit {

  @Input() initMonthIndex: number;
  @Input() initYear: number;

  @Output() intervalChanged = new EventEmitter<DateInterval>()

  emulatedDate: Date;
  formated: string = '';

  constructor() { }

  ngOnInit() {
    this.updateState(new Date(), this.initMonthIndex, this.initYear);
  }

  updateEmulatedDate(date: Date, initMonthIndex?: number, initYear?: number) {
    this.emulatedDate = date;

    if(initMonthIndex) {
      this.emulatedDate.setMonth(this.initMonthIndex)
    }

    if(initYear) {
      this.emulatedDate.setFullYear(this.initYear)
    }

    this.emulatedDate.setDate(1);
    this.emulatedDate.setHours(0, 0, 0, 0);
  }

  updateFormated() {
    this.formated = format(this.emulatedDate, 'MMMM yyyy')
  }

  emitChanges() {
    this.intervalChanged.emit({
      from: startOfMonth(this.emulatedDate),
      to: endOfMonth(this.emulatedDate)
    })
  }

  goToPreviousMonth() {
    const prevMonthDate = subMonths(this.emulatedDate, 1);
    this.updateState(prevMonthDate);
  }
  
  goToNextMonth() {
    const nextMonthDate = addMonths(this.emulatedDate, 1);
    this.updateState(nextMonthDate);
  }

  updateState(date: Date, initMonthIndex?: number, initYear?: number) {
    this.updateEmulatedDate(date, initMonthIndex, initYear);
    this.updateFormated();
    this.emitChanges();
  }

}
