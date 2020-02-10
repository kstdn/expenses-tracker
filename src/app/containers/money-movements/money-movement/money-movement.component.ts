import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MoneyMovement } from 'src/app/models/MoneyMovement';
import { Money } from 'src/app/helpers/util';
import { DialogsService } from 'src/app/services/dialogs.service';

@Component({
  selector: 'money-movement',
  templateUrl: './money-movement.component.html',
  styleUrls: ['./money-movement.component.scss']
})
export class MoneyMovementComponent implements OnInit, OnChanges {

  @Input() movement: MoneyMovement;

  amount = '';
  isNegative = false;

  constructor(
    private dialogsService: DialogsService
  ) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    this.isNegative = this.getIsNegative();
    this.amount = this.getAmount();
  }

  getAmount() {
    return `${Money(this.movement.money).toFormat('0.00')} ${Money(this.movement.money).getCurrency()}`;
  }

  getIsNegative() {
    return Money(this.movement.money).isNegative();
  }

  openUpdateMovementDialog() {
    this.dialogsService.openMovementCrud(this.movement);
  }

}
