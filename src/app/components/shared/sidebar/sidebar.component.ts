import { Component, OnInit, HostBinding, HostListener } from '@angular/core';

@Component({
  selector: 'et-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @HostBinding('class.open') open = false;
  @HostListener('click') onClick() {
    this.toggle();
  };

  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.open = !this.open;
  }

}
