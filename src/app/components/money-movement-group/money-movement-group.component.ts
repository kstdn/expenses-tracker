import { Component, OnInit, Input } from '@angular/core';
import { MoneyMovement } from 'src/app/models/MoneyMovement';

@Component({
  selector: 'money-movement-group',
  templateUrl: './money-movement-group.component.html',
  styleUrls: ['./money-movement-group.component.scss']
})
export class MoneyMovementGroupComponent implements OnInit {

  @Input() moneyMovements: MoneyMovement[];
  @Input() timestamp: Date;
  @Input() isFirst: boolean;
  @Input() isLast: boolean;

  constructor() { }

  ngOnInit() {
  }

}
