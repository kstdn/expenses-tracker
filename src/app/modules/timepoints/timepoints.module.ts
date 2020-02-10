import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimepointsRoutingModule } from './timepoints-routing.module';
import { TimepointsComponent } from './containers/timepoints/timepoints.component';

@NgModule({
  declarations: [
    TimepointsComponent
  ],
  imports: [
    CommonModule,
    TimepointsRoutingModule
  ]
})
export class TimepointsModule { }
