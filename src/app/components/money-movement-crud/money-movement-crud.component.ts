import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MoneyMovement } from 'src/app/models/MoneyMovement';
import { MovementsService } from 'src/app/services/movements.service';
import { finalize } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Precision } from 'src/app/helpers/Constants';

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

  amountWholePartAbs: number = 0;
  amountDecimalPart: number = 0;
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
      const amountWholePart = this.movement.money.amount / (Math.pow(10, Precision))
      this.amountWholePartAbs = Math.floor(Math.abs(amountWholePart));
      this.amountDecimalPart = Math.abs(this.movement.money.amount % (Math.pow(10, Precision)));
      this.timestamp = this.movement.timestamp;
      this.typeId = this.movement.type;
      this.directionId = amountWholePart < 0 ? 0 : 1;
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

  submit() {
    const amountWholePart = this.amountWholePartAbs;
    const amountDecimalPart = Math.abs(this.amountDecimalPart); // abs should not be neccessary
    const sum = (amountWholePart * Math.pow(10, Precision)) + amountDecimalPart;

    const amount = this.isNegative() ? sum * -1 : sum;

    if (!this.movement) {
      this.movementsService.addMovement$(amount, this.timestamp, this.typeId, this.description)
        .pipe(finalize(() => this.remove()))
        .subscribe();
    } else {
      this.movementsService.updateMovement$(this.movement.id, amount, this.timestamp, this.typeId, this.description)
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
      !!this.timestamp &&
      this.amountDecimalPart < 100 &&
      this.amountDecimalPart >= 0 &&
      ((this.amountWholePartAbs === 0 &&
        this.amountDecimalPart > 0) ||
        this.amountWholePartAbs > 0)
  }

  remove() {
    this.dialogRef.close();
  }

}
