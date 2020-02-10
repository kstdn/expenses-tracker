import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'et-toolbar-item',
  templateUrl: './toolbar-item.component.html',
  styleUrls: ['./toolbar-item.component.scss']
})
export class ToolbarItemComponent implements OnInit {

  @Input() link;
  @Input() text;
  @Input() icon;
  @Input() iconContainerWidth;

  constructor() { }

  ngOnInit() {
  }

}
