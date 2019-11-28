import { Component, OnInit } from '@angular/core';
import { MoneyMovement } from 'src/app/models/MoneyMovement';
import { PortalService } from 'src/app/services/portal.service';
import { MovementsService } from 'src/app/services/movements.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-money-movement-crud',
  templateUrl: './money-movement-crud.component.html',
  styleUrls: ['./money-movement-crud.component.scss']
})
export class MoneyMovementCrudComponent implements OnInit {

  movement: MoneyMovement;

  amount: number;

  constructor(
    private portalService: PortalService,
    private movementsService: MovementsService
  ) { }

  ngOnInit() {
    if (this.movement) {

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

  submit() {
    if (this.amount === undefined || this.amount === null) {
      return;
    }

    this.movementsService.addMovement(this.amount)
      .pipe(finalize(() => this.remove()))
      .subscribe();
  }

  remove() {
    this.portalService.portal = undefined;
  }

}
