import { Component, OnInit, Input } from '@angular/core';
import { MoneyMovement } from 'src/app/models/MoneyMovement';
import { Money } from 'src/app/helpers/util';

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

  get amount(): string {
    return `${Money(this.movement.money).toFormat('0.00')} ${Money(this.movement.money).getCurrency()}`;
  }

  get isNegative(): boolean {
    return Money(this.movement.money).isNegative();
  }

}
