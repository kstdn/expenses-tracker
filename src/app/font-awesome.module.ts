import { NgModule } from '@angular/core';
import { FontAwesomeModule as FortAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight, faHome, faCalendarAlt, faQuestion, faUser } from '@fortawesome/free-solid-svg-icons';

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
      faHome,
      faCalendarAlt,
      faQuestion,
      faUser,
    )
  }
}
