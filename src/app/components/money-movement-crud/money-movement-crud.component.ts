import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MoneyMovement } from 'src/app/models/MoneyMovement';
import { MovementsService } from 'src/app/services/movements.service';
import { finalize } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { SimpleMoney } from 'src/app/models/SimpleMoney';
import { Money } from 'src/app/helpers/util';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Messages } from 'src/app/constants/Messages';

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

  deleteButtonVisible = false;
  deleteConfirmationPromptVisible = false;

  amount: number;
  directionId: number = this.movementDirections[0].id;
  typeId: number = this.movementTypes[0].id;
  timestamp: Date = new Date();
  description: string;

  constructor(
    private movementsService: MovementsService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<MoneyMovementCrudComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public movement: MoneyMovement
  ) { }

  ngOnInit() {
    if (this.movement) {
      this.amount = this.movement.money.amount;
      this.timestamp = new Date(this.movement.timestamp);
      this.typeId = this.movement.type;
      this.directionId = Money(this.movement.money).isNegative() ? 0 : 1;
      this.description = this.movement.description;

      this.deleteButtonVisible = true;
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

  isNegative() {
    return this.directionId === 0;
  }

  dateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    this.timestamp = event.value;
  }

  onMoneyChanged(money: SimpleMoney): void {
    this.amount = money && money.amount;
  }

  onIsNegativeChanged(isNegative: boolean): void {
    this.directionId = isNegative ? 0 : 1;
  }

  submit() {

    if (!this.movement) {
      const movement: MoneyMovement = collectInputs(this);
      this.movementsService.addMovement$(movement)
        .pipe(finalize(() => this.remove()))
        .subscribe();
    } else {
      const updatedMovement: MoneyMovement = {
        ...this.movement,
        ...collectInputs(this)
      }
      this.movementsService.updateMovement$(updatedMovement)
        .pipe(finalize(() => this.remove()))
        .subscribe();
    }
  }

  submitDelete() {
    this.movementsService.deleteMovement$(this.movement)
      .subscribe({
        next: () => { 
          this.snackBar.open(Messages.Deleted)
          this.remove()
        }
      });
  }

  showDeleteConfirmationPrompt() {
    this.deleteConfirmationPromptVisible = true;
  }

  hideDeleteConfirmationPrompt() {
    this.deleteConfirmationPromptVisible = false;
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

const collectInputs = (component: MoneyMovementCrudComponent): MoneyMovement => {
  return {
    money: { amount: component.amount, currency:'BGN', precision: 2 },
    timestamp: component.timestamp.getTime(),
    type: component.typeId,
    description: component.description
  }
}
