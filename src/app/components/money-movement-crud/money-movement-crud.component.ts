import { Component, Inject, OnInit, Optional } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Currency } from 'dinero.js';
import { finalize } from "rxjs/operators";
import { Messages } from "src/app/constants/Messages";
import { Money } from "src/app/helpers/util";
import { MoneyMovement } from "src/app/models/MoneyMovement";
import { State } from "src/app/services/state.service";
import { AutoUnsubscribe, takeWhileAlive } from "take-while-alive";
import { CreateMoneyMovementDto, UpdateMoneyMovementDto } from "../../models/dto/money-movement.dto";

type MoneyMovementCrudInput = {
  movement: MoneyMovement;
  accountId: string;
  currency: Currency;
};

@Component({
  templateUrl: "./money-movement-crud.component.html",
  styleUrls: ["./money-movement-crud.component.scss"],
})
@AutoUnsubscribe()
export class MoneyMovementCrudComponent implements OnInit {
  movementDirections = [
    {
      id: 0,
      text: "Expense",
    },
    {
      id: 1,
      text: "Income",
    },
  ];

  movementTypes = [
    {
      text: "Immediate",
    },
    {
      text: "Planned",
    },
  ];

  deleteButtonVisible = false;
  deleteConfirmationPromptVisible = false;

  form: FormGroup;

  constructor(
    private state: State,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<MoneyMovementCrudComponent>,
    public builder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public input: MoneyMovementCrudInput
  ) {}

  ngOnInit() {
    this.form = this.builder.group({
      directionId: [this.movementDirections[0].id, Validators.required],
      typeId: [this.movementTypes[0].text, Validators.required],
      amount: [0, Validators.min(1)],
      timestamp: [new Date(), Validators.required],
      description: "",
      categoryId: "",
    });

    if (this.input.movement) {
      this.form.controls.amount.setValue(
        Math.abs(this.input.movement.amount)
      );
      this.form.controls.timestamp.setValue(
        new Date(this.input.movement.timestamp)
      );
      this.form.controls.typeId.setValue(this.input.movement.type);
      this.form.controls.directionId.setValue(
        Money(this.input.movement.amount, this.input.currency).isNegative() ? 0 : 1
      );
      this.form.controls.description.setValue(this.input.movement.description);
      this.form.controls.categoryId.setValue(this.input.movement.category.id);

      this.deleteButtonVisible = true;
    }
  }

  getMode() {
    if (this.input.movement) {
      return "Edit";
    } else {
      return "Add";
    }
  }

  isNegative() {
    return this.form.controls.directionId.value === 0;
  }

  onMoneyChanged(amount: number): void {
    this.form.controls.amount.setValue(amount);
  }

  submit() {
    if (!this.input.movement) {
      const movement: CreateMoneyMovementDto = {
        ...collectInputs(this.form),
        accountId: this.input.accountId,
      };
      this.state
        .addMovement$(movement)
        .pipe(
          takeWhileAlive(this),
          finalize(() => this.remove()),
        ).subscribe();
    } else {
      const updatedMovement: UpdateMoneyMovementDto = {
        ...this.input.movement,
        ...collectInputs(this.form),
      };
      this.state
        .updateMovement$(updatedMovement)
        .pipe(
          takeWhileAlive(this),
          finalize(() => this.remove()),
        ).subscribe();
    }
  }

  submitDelete() {
    this.state.deleteMovement$(this.input.movement).subscribe({
      next: () => {
        this.snackBar.open(Messages.Deleted);
        this.remove();
      },
    });
  }

  showDeleteConfirmationPrompt() {
    this.deleteConfirmationPromptVisible = true;
  }

  hideDeleteConfirmationPrompt() {
    this.deleteConfirmationPromptVisible = false;
  }

  getInitialAmount() {
    return this.input.movement && this.input.movement.amount;
  }

  remove() {
    this.dialogRef.close();
  }
}

const collectInputs = (form: FormGroup): CreateMoneyMovementDto | UpdateMoneyMovementDto => {
  const isNegative = form.controls.directionId.value === 0;
  const multiplier = isNegative ? -1 : 1;

  return {
    amount: form.controls.amount.value * multiplier,
    timestamp: form.controls.timestamp.value,
    type: form.controls.typeId.value,
    description: form.controls.description.value,
    categoryId: form.controls.categoryId.value,
  };
};
