import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'et-hamburger-icon',
  templateUrl: './hamburger-icon.component.html',
  styleUrls: ['./hamburger-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HamburgerIconComponent {

  @Input() showX: boolean = false;

}
