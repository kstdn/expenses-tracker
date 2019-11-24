import { Component, OnInit, Input } from '@angular/core';
import { MoneyMovementGroup } from 'src/app/models/MoneyMovementGroup';

@Component({
  selector: 'money-movement-group',
  templateUrl: './money-movement-group.component.html',
  styleUrls: ['./money-movement-group.component.scss']
})
export class MoneyMovementRowComponent implements OnInit {

  @Input() moneyMovementGroup: MoneyMovementGroup;
  @Input() date: Date;
  @Input() isFirst: boolean;
  @Input() isLast: boolean;

  constructor() { }

  ngOnInit() {
  }

}
