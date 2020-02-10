import { Component, OnInit, HostBinding, HostListener, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { AutoUnsubscribe, takeWhileAlive } from 'take-while-alive';
import { tap, shareReplay } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromStore from 'src/app/store';

@Component({
  selector: 'et-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
@AutoUnsubscribe()
export class ToolbarComponent implements OnInit {

  readonly closedWidth = '40px';
  readonly openWidth = '200px';

  open$ = this.store.select(fromStore.selectToolbarExpanded).pipe(shareReplay(1));

  constructor(
    private store: Store<fromStore.State>,
    private elementRef: ElementRef<HTMLElement>
  ) { }

  ngOnInit() {
    // Close the toolbar when user clicks outside of it
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
    this.store.dispatch(fromStore.toggleToolbar())
  }

  close() {
    this.store.dispatch(fromStore.closeToolbar())
  }

}
