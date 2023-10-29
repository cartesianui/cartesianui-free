import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CartesianHttpInterceptor } from '@cartesianui/core';

import { CommonModule as CartesianCommonModule } from '@cartesianui/common';
import { SharedModule } from '@shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { AccountEffects, reducer as accountReducer } from './store';
import { AccountSandbox } from './account.sandbox';
import { AccountService, AccountHttpService, AccountLanguagesComponent, AccountHeaderComponent, AccountFooterComponent } from './shared';

import { AccountComponent } from './account.component';
import { LoginComponent } from './ui/login/login.component';
import { RegisterComponent } from './ui/register/register.component';

// Third Party
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    CartesianCommonModule,
    AccountRoutingModule,
    SharedModule,
    ModalModule.forChild(),
    StoreModule.forFeature('account', accountReducer),
    EffectsModule.forFeature([AccountEffects])
  ],
  declarations: [AccountComponent, LoginComponent, RegisterComponent, AccountLanguagesComponent, AccountHeaderComponent, AccountFooterComponent],
  providers: []
})
export class AccountModule {
  static forRoot(): ModuleWithProviders<AccountModule> {
    return {
      ngModule: AccountModule,
      providers: [AccountHttpService, AccountSandbox, AccountService]
    };
  }
}
