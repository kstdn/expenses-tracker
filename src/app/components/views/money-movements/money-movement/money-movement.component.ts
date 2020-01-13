import { Component, OnInit, Input } from '@angular/core';
import { MoneyMovement } from 'src/app/models/MoneyMovement';
import { Money } from 'src/app/helpers/util';
import { DialogsService } from 'src/app/services/dialogs.service';

@Component({
  selector: 'money-movement',
  templateUrl: './money-movement.component.html',
  styleUrls: ['./money-movement.component.scss']
})
export class MoneyMovementComponent implements OnInit {

  @Input() movement: MoneyMovement;

  constructor(
    private dialogsService: DialogsService
  ) { }

  ngOnInit() {
  }

  get amount(): string {
    return `${Money(this.movement.money).toFormat('0.00')} ${Money(this.movement.money).getCurrency()}`;
  }

  get isNegative(): boolean {
    return Money(this.movement.money).isNegative();
  }

  openUpdateMovementDialog() {
    this.dialogsService.openMovementCrud(this.movement);
  }

}
