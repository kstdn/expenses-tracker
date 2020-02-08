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

  isNegative = false;

  constructor(
    private dialogsService: DialogsService
  ) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    this.isNegative = Money(this.movement.money).isNegative();
  }

  get amount(): string {
    return `${Money(this.movement.money).toFormat('0.00')} ${Money(this.movement.money).getCurrency()}`;
  }

  openUpdateMovementDialog() {
    this.dialogsService.openMovementCrud(this.movement);
  }

}
