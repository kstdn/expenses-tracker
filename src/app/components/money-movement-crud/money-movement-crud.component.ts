import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MoneyMovement } from 'src/app/models/MoneyMovement';
import { MovementsService } from 'src/app/services/movements.service';
import { finalize } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { SimpleMoney } from 'src/app/models/SimpleMoney';
import { Money } from 'src/app/helpers/util';

interface MovementType {
  id: number;
  text: string;
}

@Component({
  templateUrl: './money-movement-crud.component.html',
  styleUrls: ['./money-movement-crud.component.scss']
})
export class MoneyMovementCrudComponent implements OnInit {

  movementDirections = [{
    id: 0,
    text: 'Expense'
  }, {
    id: 1,
    text: 'Income'
  }];

  movementTypes = [{
    id: 0,
    text: 'Immediate'
  }, {
    id: 1,
    text: 'Planned'
  }];

  amount: number;
  directionId: number = this.movementDirections[0].id;
  typeId: number = this.movementTypes[0].id;
  timestamp: string = new Date().toISOString();
  description: string;

  constructor(
    private movementsService: MovementsService,
    public dialogRef: MatDialogRef<MoneyMovementCrudComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public movement: MoneyMovement
  ) { }

  ngOnInit() {
    if (this.movement) {
      this.amount = this.movement.money.amount;
      this.timestamp = this.movement.timestamp;
      this.typeId = this.movement.type;
      this.directionId = Money(this.movement.money).isNegative() ? 0 : 1;
      this.description = this.movement.description;
    } else {

    }
  }

  getMode() {
    if (this.movement) {
      return 'Edit';
    } else {
      return 'Add';
    }
  }

  dateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    this.timestamp = event.value.toISOString();
  }

  onMoneyChanged(money: SimpleMoney): void {
    this.amount = money && money.amount;
  }

  onIsNegativeChanged(isNegative: boolean): void {
    this.directionId = isNegative ? 0 : 1;
  }

  submit() {

    if (!this.movement) {
      this.movementsService.addMovement$(this.amount, this.timestamp, this.typeId, this.description)
        .pipe(finalize(() => this.remove()))
        .subscribe();
    } else {
      this.movementsService.updateMovement$(this.movement.id, this.amount, this.timestamp, this.typeId, this.description)
        .pipe(finalize(() => this.remove()))
        .subscribe();
    }
  }

  isNegative() {
    return this.directionId === 0;
  }

  get submitIsActive() {
    return this.typeId !== undefined &&
      this.directionId !== undefined &&
      !!this.timestamp && !!this.amount;
  }

  getInitialMoney() {
    return this.movement && this.movement.money;
  }

  remove() {
    this.dialogRef.close();
  }

}
