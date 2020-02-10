import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'et-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.scss']
})
export class SidebarItemComponent implements OnInit {

  @Input() link;
  @Input() text;
  @Input() icon;
  @Input() iconContainerWidth;

  constructor() { }

  ngOnInit() {
  }

}
