import { Component, OnInit, HostBinding, HostListener, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { AutoUnsubscribe, takeWhileAlive } from 'take-while-alive';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'et-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
@AutoUnsubscribe()
export class SidebarComponent implements OnInit {

  readonly closedWidth = '40px';
  readonly openWidth = '200px';

  @HostBinding('class.open') open = false;

  constructor(
    private elementRef: ElementRef<HTMLElement>
  ) { }

  ngOnInit() {

    // Close the sidebar when user clicks outside of it
    fromEvent(window, 'click')
      .pipe(
        takeWhileAlive(this),
        tap(event => {
          if (!this.elementRef.nativeElement.contains(event.target as Node)) {
            this.close();
          }
        })
      )
      .subscribe();
  }

  toggle() {
    this.open = !this.open;
  }

  close() {
    this.open = false;
  }

}
