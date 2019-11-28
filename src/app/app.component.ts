import { Component, OnInit } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { PortalService } from './services/portal.service';
import { MoneyMovementCrudComponent } from './components/money-movement-crud/money-movement-crud.component';
import { MovementsService } from './services/movements.service';
import { takeWhileAlive, AutoUnsubscribe } from 'take-while-alive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
@AutoUnsubscribe()
export class AppComponent implements OnInit {
  balance = '';

  constructor(
    private portalService: PortalService,
    private movementsService: MovementsService
  ) { }

  ngOnInit() {
    this.movementsService.changes$
      .pipe(takeWhileAlive(this))
      .subscribe(() => this.refreshBalance())
  }

  get portal() {
    return this.portalService.portal;
  }

  refreshBalance() {
    this.movementsService.getCurrentBalance$()
      .pipe(takeWhileAlive(this))
      .subscribe({
        next: balance => this.balance = balance
      })
  }

  addMovement() {
    this.portalService.portal = new ComponentPortal(MoneyMovementCrudComponent);
  }
}
