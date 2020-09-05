import { NgModule } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule as FortAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

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
    library.addIconPacks(fas)
  }
}
