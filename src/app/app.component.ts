import { Component } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { PortalService } from './services/portal.service';
import { MoneyMovementCrudComponent } from './components/money-movement-crud/money-movement-crud.component';
import { MovementsService } from './services/movements.service';
import { BackendService } from './services/backend.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'expenses-tracker';

  constructor(
    private portalService: PortalService,
    private movementsService: MovementsService,
    private backendService: BackendService
  ) { }

  get portal() {
    return this.portalService.portal;
  }

  balance$ = this.backendService.getAllMoneyMovements$()
    .pipe(
      map(movements => this.movementsService.getCurrentBalance(movements).toFormat('0.00') + ' BGN')
    )

  addMovement() {
    this.portalService.portal = new ComponentPortal(MoneyMovementCrudComponent);
  }
}
