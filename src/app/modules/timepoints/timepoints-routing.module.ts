import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimepointsComponent } from './containers/timepoints/timepoints.component';

const routes: Routes = [
  {
    path: '', component: TimepointsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimepointsRoutingModule { }
