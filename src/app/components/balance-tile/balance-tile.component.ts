import { Component, OnInit, Input } from '@angular/core';
import { AutoUnsubscribe } from 'take-while-alive';
import { DialogsService } from 'src/app/services/dialogs.service';
import * as fromStore from 'src/app/store';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { formatMoney } from 'src/app/helpers/util';

@Component({
  selector: 'balance-tile',
  templateUrl: './balance-tile.component.html',
  styleUrls: ['./balance-tile.component.scss']
})
@AutoUnsubscribe()
export class BalanceTileComponent implements OnInit {

  @Input() accountId: string;

  loading$ = this.store.select(fromStore.selectBalanceLoading);
  loaded$ = this.store.select(fromStore.selectBalanceLoaded);
  balance$ = this.store.select(fromStore.selectMovementBalance).pipe(map(formatMoney));

  constructor(
    private dialogsService: DialogsService,
    private store: Store<fromStore.State>
  ) { }

  ngOnInit() { }

  enterNewBalance() {
    this.dialogsService.openBalanceUpdate(this.accountId);
  }

}
