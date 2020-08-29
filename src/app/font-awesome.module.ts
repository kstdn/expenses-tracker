import { NgModule } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule as FortAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendarAlt, faChevronLeft, faChevronRight, faQuestion, faUser, faWallet } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [],
  imports: [
    FortAwesomeModule
  ],
  exports: [
    FortAwesomeModule
  ]
})
export class FontAwesomeModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faChevronLeft,
      faChevronRight,
      faCalendarAlt,
      faQuestion,
      faUser,
      faWallet,
    )
  }
}
