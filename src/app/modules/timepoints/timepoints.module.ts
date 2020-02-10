import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimepointsRoutingModule } from './timepoints-routing.module';
import { TimepointsComponent } from './containers/timepoints/timepoints.component';
import { StoreModule } from '@ngrx/store';
import * as fromTimepointsState from './store/timepoints.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TimepointsEffects } from './store';

@NgModule({
  declarations: [
    TimepointsComponent
  ],
  imports: [
    CommonModule,
    TimepointsRoutingModule,
    StoreModule.forFeature(fromTimepointsState.timepointsStateFeatureKey, fromTimepointsState.reducer),
    EffectsModule.forFeature([TimepointsEffects])
  ]
})
export class TimepointsModule { }
