import { Component, OnInit, Input } from '@angular/core';
import { MoneyMovement } from 'src/app/models/MoneyMovement';

@Component({
  selector: 'money-movement',
  templateUrl: './money-movement.component.html',
  styleUrls: ['./money-movement.component.scss']
})
export class MoneyMovementComponent implements OnInit {

  @Input() movement: MoneyMovement;

  constructor() { }

  ngOnInit() {
  }

  // get amount(): Amount {
  //   return this.movement && getAmount(this.movement.amount);
  // }

  get isNegative(): boolean {
    return this.movement.sign < 1;
  }

}
