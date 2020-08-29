import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoneyMovementGroupComponent } from './containers/money-movements/money-movement-group/money-movement-group.component';
import { MoneyMovementComponent } from './containers/money-movements/money-movement/money-movement.component';
import { MoneyMovementsComponent } from './containers/money-movements/money-movements/money-movements.component';
import { MoneyMovementCrudComponent } from './components/money-movement-crud/money-movement-crud.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { AmountInputComponent } from './components/shared/amount-input/amount-input.component';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MonthPickerComponent } from './components/shared/month-picker/month-picker.component';
import { HelpComponent } from './containers/help/help/help.component';
import { LoaderComponent } from './components/shared/loader/loader.component';
import { BalanceUpdateComponent } from './components/balance-update/balance-update.component';
import { BalanceTileComponent } from './components/balance-tile/balance-tile.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './store/effects';
import { ToolbarComponent } from './components/shared/toolbar/toolbar.component';
import { HamburgerIconComponent } from './components/shared/hamburger-icon/hamburger-icon.component';
import { ToolbarItemComponent } from './components/shared/toolbar-item/toolbar-item.component';
import { FontAwesomeModule } from './font-awesome.module';
import { ExtractDataInterceptor } from './interceptors/extract-data.interceptor';
import { DateInterceptor } from './interceptors/date.interceptor';
import { LoginComponent } from './containers/login/login.component';
import { CookiesInterceptor } from './interceptors/cookies.interceptor';
import { AccountsComponent } from './containers/accounts/accounts.component';
import { AccountCrudComponent } from './components/account-crud/account-crud.component';
import { RefreshTokenInterceptor } from './interceptors/refresh-token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    MoneyMovementGroupComponent,
    MoneyMovementComponent,
    MoneyMovementsComponent,
    MoneyMovementCrudComponent,
    AccountCrudComponent,
    AmountInputComponent,
    MonthPickerComponent,
    HelpComponent,
    LoaderComponent,
    BalanceUpdateComponent,
    BalanceTileComponent,
    ToolbarComponent,
    HamburgerIconComponent,
    ToolbarItemComponent,
    LoginComponent,
    AccountsComponent,
  ],
  entryComponents: [
    MoneyMovementCrudComponent,
    AccountCrudComponent,
    BalanceUpdateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatSnackBarModule,
    FontAwesomeModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot(effects)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ExtractDataInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: DateInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CookiesInterceptor, multi: true },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3000 } },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        maxHeight: '90vh',
        hasBackdrop: true
      }
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
