import { Component, OnInit } from '@angular/core';
import { MoneyMovement } from 'src/app/models/MoneyMovement';
import { PortalService } from 'src/app/services/portal.service';

@Component({
  selector: 'app-money-movement-crud',
  templateUrl: './money-movement-crud.component.html',
  styleUrls: ['./money-movement-crud.component.scss']
})
export class MoneyMovementCrudComponent implements OnInit {

  movement: MoneyMovement;

  constructor(
    private portalService: PortalService
  ) { }

  ngOnInit() {
  }

  getMode() {
    if(this.movement) {
      return 'Edit';
    } else {
      return 'Add';
    }
  }

  remove() {
    this.portalService.portal = undefined;
  }

}
