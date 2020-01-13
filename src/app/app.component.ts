import { Component, OnInit } from '@angular/core';
import { AutoUnsubscribe } from 'take-while-alive';
import { DialogsService } from './services/dialogs.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
@AutoUnsubscribe()
export class AppComponent implements OnInit {

  constructor(
    private dialogsService: DialogsService,
    private iconLibrary: FaIconLibrary
  ) { }

  ngOnInit() {
    this.iconLibrary.addIcons(faChevronLeft, faChevronRight)
  }

  addMovement(): void {
    this.dialogsService.openMovementCrud();
  }
}
