import { Component, OnInit } from '@angular/core';
import { AutoUnsubscribe } from 'take-while-alive';

@Component({
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
@AutoUnsubscribe()
export class HelpComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {
  }

}
