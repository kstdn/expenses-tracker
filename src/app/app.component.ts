import { Component, OnInit } from '@angular/core';
import { AutoUnsubscribe } from 'take-while-alive';
import { DialogsService } from './services/dialogs.service';
import * as fromStore from './store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'et-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
@AutoUnsubscribe()
export class AppComponent implements OnInit {

  constructor(
    private dialogsService: DialogsService,
    private store: Store<fromStore.State>
  ) { }

  ngOnInit() { }

  addMovement(): void {
    this.dialogsService.openMovementCrud();
  }

  onRouterOutletActivate() {
    this.store.dispatch(fromStore.closeToolbar());
  }
}
