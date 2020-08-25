import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoneyMovementsComponent } from './containers/money-movements/money-movements/money-movements.component';
import { HelpComponent } from './containers/help/help/help.component';
import { LoginComponent } from './containers/login/login.component';

const routes: Routes = [
  {
    path: 'home', component: MoneyMovementsComponent,
  },
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'timepoints',
    loadChildren: () => import('./modules/timepoints/timepoints.module').then(m => m.TimepointsModule),
  },
  {
    path: 'help', component: HelpComponent,
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
