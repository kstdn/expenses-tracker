import { Component, OnInit } from '@angular/core';
import { AutoUnsubscribe } from 'take-while-alive';
import { DialogsService } from './services/dialogs.service';

@Component({
  selector: 'et-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
@AutoUnsubscribe()
export class AppComponent implements OnInit {

  constructor(
    private dialogsService: DialogsService
  ) { }

  ngOnInit() { }

  addMovement(): void {
    this.dialogsService.openMovementCrud();
  }
}
