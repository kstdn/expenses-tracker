import { Component, Input, OnInit } from '@angular/core';
import { Currency } from 'dinero.js';
import { MoneyMovement } from 'src/app/models/MoneyMovement';

@Component({
  selector: 'money-movement-group',
  templateUrl: './money-movement-group.component.html',
  styleUrls: ['./money-movement-group.component.scss']
})
export class MoneyMovementGroupComponent implements OnInit {

  @Input() moneyMovements: MoneyMovement[];
  @Input() currency: Currency;
  @Input() timestamp: Date;
  @Input() isFirst: boolean;
  @Input() isLast: boolean;
  @Input() isOnly: boolean;

  constructor() { }

  ngOnInit() {
  }

}
