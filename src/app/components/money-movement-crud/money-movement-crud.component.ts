import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MoneyMovement } from 'src/app/models/MoneyMovement';
import { MovementsService } from 'src/app/services/movements.service';
import { finalize } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  templateUrl: './money-movement-crud.component.html',
  styleUrls: ['./money-movement-crud.component.scss']
})
export class MoneyMovementCrudComponent implements OnInit {

  amount: number;
  timestamp: string;

  constructor(
    private movementsService: MovementsService,
    public dialogRef: MatDialogRef<MoneyMovementCrudComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public movement: MoneyMovement
  ) { }

  ngOnInit() {
    if (this.movement) {
      this.amount = this.movement.money.amount;
      this.timestamp = this.movement.timestamp;
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

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.timestamp = event.value.toISOString();
  }

  submit() {
    if (!this.amount) {
      return;
    }

    if(!this.movement) {
      this.movementsService.addMovement$(this.amount, this.timestamp)
      .pipe(finalize(() => this.remove()))
      .subscribe();
    } else {
      this.movementsService.updateMovement$(this.movement.id, this.amount, this.timestamp)
      .pipe(finalize(() => this.remove()))
      .subscribe();
    }
  }

  remove() {
    this.dialogRef.close();
  }

}
