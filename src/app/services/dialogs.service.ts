import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MoneyMovementCrudComponent } from '../components/money-movement-crud/money-movement-crud.component';
import { MoneyMovement } from '../models/MoneyMovement';
import { BalanceUpdateComponent } from '../components/balance-update/balance-update.component';

@Injectable({
  providedIn: 'root'
})
export class DialogsService {

  constructor(
    public dialog: MatDialog
  ) { }

  openMovementCrud(movement?: MoneyMovement) {
    const dialogRef = this.dialog.open(MoneyMovementCrudComponent, {
      width: '450px',
      data: movement
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The movement crud dialog was closed');
    });
  }

  openBalanceUpdate() {
    const dialogRef = this.dialog.open(BalanceUpdateComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The balance update dialog was closed');
    });
  }
}
