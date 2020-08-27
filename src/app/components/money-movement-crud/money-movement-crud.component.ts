import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MoneyMovement } from 'src/app/models/MoneyMovement';
import { MovementsService } from 'src/app/services/movements.service';
import { finalize, tap } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SimpleMoney } from 'src/app/models/SimpleMoney';
import { Money } from 'src/app/helpers/util';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Messages } from 'src/app/constants/Messages';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { takeWhileAlive, AutoUnsubscribe } from 'take-while-alive';
import * as fromStore from 'src/app/store';

@Component({
  templateUrl: './money-movement-crud.component.html',
  styleUrls: ['./money-movement-crud.component.scss']
})
@AutoUnsubscribe()
export class MoneyMovementCrudComponent implements OnInit {

  movementDirections = [{
    id: 0,
    text: 'Expense'
  }, {
    id: 1,
    text: 'Income'
  }];

  movementTypes = [{
    text: 'Immediate'
  }, {
    text: 'Planned'
  }];

  deleteButtonVisible = false;
  deleteConfirmationPromptVisible = false;

  form: FormGroup;

  constructor(
    private movementsService: MovementsService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<MoneyMovementCrudComponent>,
    public builder: FormBuilder,
    private actions$: Actions,
    @Optional() @Inject(MAT_DIALOG_DATA) public movement: MoneyMovement
  ) { }

  ngOnInit() {
    this.form = this.builder.group({
      directionId: [this.movementDirections[0].id, Validators.required],
      typeId: [this.movementTypes[0].text, Validators.required],
      amount: [0, Validators.min(1)],
      timestamp: [new Date(), Validators.required],
      description: ''
    })

    if (this.movement) {
      this.form.controls.amount.setValue(Math.abs(this.movement.money.amount));
      this.form.controls.timestamp.setValue(new Date(this.movement.timestamp));
      this.form.controls.typeId.setValue(this.movement.type);
      this.form.controls.directionId.setValue(Money(this.movement.money).isNegative() ? 0 : 1);
      this.form.controls.description.setValue(this.movement.description);

      this.deleteButtonVisible = true;
    }

    this.actions$.pipe(
      takeWhileAlive(this),
      ofType(fromStore.addMovementSuccess),
      tap(() => this.remove())
    ).subscribe();
  }

  getMode() {
    if (this.movement) {
      return 'Edit';
    } else {
      return 'Add';
    }
  }

  isNegative() {
    return this.form.controls.directionId.value === 0;
  }

  onMoneyChanged(money: SimpleMoney): void {
    this.form.controls.amount.setValue(money && money.amount);
  }

  submit() {
    if (!this.movement) {
      const movement: MoneyMovement = collectInputs(this.form);
      this.movementsService.addMovement(movement);
    } else {
      const updatedMovement: MoneyMovement = {
        ...this.movement,
        ...collectInputs(this.form)
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

  getInitialMoney() {
    return this.movement && this.movement.money;
  }

  remove() {
    this.dialogRef.close();
  }

}

const collectInputs = (form: FormGroup): MoneyMovement => {
  const isNegative = form.controls.directionId.value === 0;
  const multiplier = isNegative ? -1 : 1;

  return {
    money: { amount: form.controls.amount.value * multiplier, currency:'BGN', precision: 2 },
    timestamp: form.controls.timestamp.value,
    type: form.controls.typeId.value,
    description: form.controls.description.value
  }
}
