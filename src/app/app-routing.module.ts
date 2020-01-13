import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoneyMovementsComponent } from './components/views/money-movements/money-movements/money-movements.component';
import { HelpComponent } from './components/views/help/help/help.component';

const routes: Routes = [
  {
    path: 'home', component: MoneyMovementsComponent,
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
