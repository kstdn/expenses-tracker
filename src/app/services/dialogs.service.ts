import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MoneyMovementCrudComponent } from '../components/money-movement-crud/money-movement-crud.component';
import { MoneyMovement } from '../models/MoneyMovement';

@Injectable({
  providedIn: 'root'
})
export class DialogsService {

  constructor(
    public dialog: MatDialog
  ) { }

  openMovementCrud(movement?: MoneyMovement) {
    const dialogRef = this.dialog.open(MoneyMovementCrudComponent, {
      width: '250px',
      data: movement
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
