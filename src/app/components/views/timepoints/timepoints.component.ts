import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timepoints',
  templateUrl: './timepoints.component.html',
  styleUrls: ['./timepoints.component.scss']
})
export class TimepointsComponent implements OnInit {

  timepointOptions = Array.from(Array(31).keys()).map(k => k+1);

  selectedTimepoints = [5, 14];

  constructor() { }

  ngOnInit() {}

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
