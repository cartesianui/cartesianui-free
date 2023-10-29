import { NgModule, APP_INITIALIZER, LOCALE_ID, InjectionToken } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppConstants, HttpServiceModule, CartesianHttpInterceptor } from '@cartesianui/core';
import { CommonModule as CartesianCommonModule } from '@cartesianui/common';
import { BoLayoutModule } from '@cartesianui/coreui';

import { SharedModule } from '@shared/shared.module';
import { AccountModule } from '@account/account.module';
import { AppInitializerService } from './app-initializer.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppSandbox } from './app.sandbox';

// Third Party
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

export function getDatepickerConfig(): BsDatepickerConfig {
  return Object.assign(new BsDatepickerConfig(), {
    dateInputFormat: 'DD/MM/YYYY'
  });
}

export function getCurrentLanguage(): string {
  if (cartesian.localization.currentLanguage.name) {
    return cartesian.localization.currentLanguage.name;
  }

  // todo: Waiting for https://github.com/angular/angular/issues/31465 to be fixed.
  return 'en';
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpServiceModule.forRoot(),
    CartesianCommonModule.forRoot(),
    BoLayoutModule.forRoot(),
    SharedModule.forRoot(),
    AccountModule.forRoot(),
    // ServiceProxyModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot()
  ],
  declarations: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CartesianHttpInterceptor, multi: true },
    {
      provide: API_BASE_URL,
      useFactory: () => AppConstants.remoteServiceBaseUrl
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (appInitializer: AppInitializerService) => appInitializer.init(),
      deps: [AppInitializerService],
      multi: true
    },
    { provide: LOCALE_ID, useFactory: getCurrentLanguage },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    { provide: BsDatepickerConfig, useFactory: getDatepickerConfig },
    Title,
    AppSandbox
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
