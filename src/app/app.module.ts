import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoneyMovementRowComponent } from './components/money-movement-group/money-movement-group.component';
import { MoneyMovementComponent } from './components/money-movement/money-movement.component';
import { MoneyMovementsComponent } from './components/money-movements/money-movements.component';
import { PortalModule } from '@angular/cdk/portal';
import { MoneyMovementCrudComponent } from './components/money-movement-crud/money-movement-crud.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MoneyMovementRowComponent,
    MoneyMovementComponent,
    MoneyMovementsComponent,
    MoneyMovementCrudComponent
  ],
  entryComponents: [
    MoneyMovementCrudComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PortalModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
