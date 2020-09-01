import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Currency } from 'dinero.js';
import { Money, formatMoney } from 'src/app/helpers/util';
import { MoneyMovement } from 'src/app/models/MoneyMovement';
import { DialogsService } from 'src/app/services/dialogs.service';

@Component({
  selector: 'money-movement',
  templateUrl: './money-movement.component.html',
  styleUrls: ['./money-movement.component.scss']
})
export class MoneyMovementComponent implements OnInit, OnChanges {

  @Input() movement: MoneyMovement;
  @Input() currency: Currency;

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
    return formatMoney(this.movement.amount, this.currency);
  }

  getIsNegative() {
    return Money(this.movement.amount, this.currency).isNegative();
  }

  openUpdateMovementDialog() {
    this.dialogsService.openMovementCrud(this.currency, this.movement);
  }

}
