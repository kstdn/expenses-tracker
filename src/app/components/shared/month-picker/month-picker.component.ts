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
    this.updateEmulatedDate(new Date(), this.initMonthIndex, this.initYear);
    this.updateFormated();
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
    this.updateEmulatedDate(prevMonthDate);
    this.updateFormated();
    this.emitChanges();
  }
  
  goToNextMonth() {
    const nextMonthDate = addMonths(this.emulatedDate, 1);
    this.updateEmulatedDate(nextMonthDate);
    this.updateFormated();
    this.emitChanges();
  }

}
