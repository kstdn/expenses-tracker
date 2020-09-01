import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoneyMovementsComponent } from './containers/money-movements/money-movements/money-movements.component';
import { HelpComponent } from './containers/help/help/help.component';
import { LoginComponent } from './containers/login/login.component';
import { AccountsComponent } from './containers/accounts/accounts.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'accounts', component: AccountsComponent, pathMatch: 'full'
  },
  {
    path: 'accounts/:id/:currency', component: MoneyMovementsComponent,
  },
  {
    path: 'timepoints',
    loadChildren: () => import('./modules/timepoints/timepoints.module').then(m => m.TimepointsModule),
  },
  {
    path: 'help', component: HelpComponent,
  },
  { path: '', redirectTo: 'accounts', pathMatch: 'full' },
  { path: '**', redirectTo: 'accounts' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
