import { Component, OnInit } from '@angular/core';
import { AutoUnsubscribe, takeWhileAlive } from 'take-while-alive';
import { finalize } from 'rxjs/operators';
import { BackendService } from 'src/app/services/backend.service';
import { MoneyMovementGroup } from 'src/app/models/MoneyMovementGroup';
import { PortalService } from 'src/app/services/portal.service';

@Component({
  selector: 'app-money-movements',
  templateUrl: './money-movements.component.html',
  styleUrls: ['./money-movements.component.scss']
})
@AutoUnsubscribe()
export class MoneyMovementsComponent implements OnInit {

  moneyMovementGroups: MoneyMovementGroup[] = [];
  
  loading: boolean = false;
  error: boolean = false;

  constructor(
    private backend: BackendService
  ) { }

  ngOnInit() {
    this.getData();
  }
  
  getData() {
    this.loading = true;
    this.error = false;
    this.backend.getAllMoneyMovementGroups$()
      .pipe(
        takeWhileAlive(this),
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: data => {
          this.moneyMovementGroups = data
        },
        error: err => this.error = true
      });
  }

}
