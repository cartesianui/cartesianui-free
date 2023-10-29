import { Injectable } from '@angular/core';
import { PlatformLocation, registerLocaleData } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Settings as DateTimeSettings } from 'luxon';
import * as _ from 'lodash';
import { environment } from '../environments/environment';
import { AppConstants, UiService, TokenService, SessionService, convertObjectKeysToCamel } from '@cartesianui/core';
import { AuthToken, AuthUser } from '@app/account/models';
import { AccountSandbox } from '@app/account/account.sandbox';

@Injectable({
  providedIn: 'root'
})
export class AppInitializerService {
  constructor(
    private platformLocation: PlatformLocation,
    private httpClient: HttpClient,
    private uiService: UiService,
    private tokenService: TokenService,
    private accountSandbox: AccountSandbox,
    private sessionService: SessionService
  ) {}

  init(): () => Promise<AuthUser | boolean> {
    return () => {
      this.uiService.setBusy();
      return new Promise<AuthUser | boolean>((resolve, reject) => {
        const appBaseUrl = this.getDocumentOrigin() + this.getBaseHref();
        AppConstants.appBaseHref = this.getBaseHref();
        AppConstants.appBaseUrl = appBaseUrl;
        this.getApplicationConfig(appBaseUrl, () => {
          this.getConfigurations(() => {
            cartesian.event.trigger('cartesian.dynamicScriptsInitialized');
            // ----------------------------------------------------------
            //            Data flow for App Session Service
            // ----------------------------------------------------------
            // Diversion #1:
            // Rule: General rule is, every thing is controlled through sandbox, sandbox has all features and only access to api services.
            // Exception: app session service is exception to that rule, as it is directly communicating with api

            // Diversion #2:
            // Rule: As redux principle, NgRx Store should be only source of truth, i.e data should flow from store only.
            // Exception: app session is exception to that as well, SessionService holds session data, and it hydrated directly through api.

            this.sessionService.init().then(
              (user: AuthUser | boolean) => {
                this.uiService.clearBusy();
                if (user) {
                  this.accountSandbox.setAuthenticatedUser(user as AuthUser);
                  this.accountSandbox.setAuthToken({ accessToken: this.tokenService.getToken() } as AuthToken);
                  if (this.shouldLoadLocale()) {
                    const angularLocale = this.convertCartesianLocaleToAngularLocale(cartesian.localization.currentLanguage.name);
                    import(`node_modules/@angular/common/locales/${angularLocale}.js`).then((module) => {
                      registerLocaleData(module.default);
                      resolve(true);
                    }, reject);
                    resolve(user);
                  } else {
                    resolve(user);
                  }
                } else {
                  resolve(false);
                }
              },
              (err) => {
                this.uiService.clearBusy();
                resolve(false);
              }
            );
          });
        });
      });
    };
  }

  private getApplicationConfig(appRootUrl: string, callback: () => void) {
    this.httpClient.get<any>(`${appRootUrl}assets/${environment.appConfig}`, {}).subscribe((response) => {
      AppConstants.remoteServiceBaseUrl = response.remoteServiceBaseUrl;
      AppConstants.localeMappings = response.localeMappings;
      AppConstants.interceptor.tenancy = response.tenancy;

      callback();
    });
  }

  private getConfigurations(callback: () => void): void {
    const cookieLangValue = cartesian.utils.getCookieValue(`Cartesian-Localization-CultureName`);
    const token = this.tokenService.getToken();

    const requestHeaders = {};

    if (cookieLangValue) {
      requestHeaders[`.Cartesian-Culture`] = `c=${cookieLangValue}|uic=${cookieLangValue}`;
    }

    if (token) {
      requestHeaders[`Authorization`] = `Bearer ${token}`;
    }

    this.httpClient
      .get<any>(`${AppConstants.remoteServiceBaseUrl}/configurations`, {
        headers: requestHeaders
      })
      .subscribe({
        next: (value) => {
          const result = convertObjectKeysToCamel(value);
          _.merge(cartesian, result);
          cartesian.clock.provider = this.getCurrentClockProvider(result.clock.provider);

          // DateTime Default Settings
          DateTimeSettings.defaultLocale = cartesian.localization.currentLanguage.name;
          DateTimeSettings.defaultZone = 'Etc/UTC';

          if (cartesian.clock.provider.supportsMultipleTimezone) {
            DateTimeSettings.defaultZone = cartesian.timing.timeZoneInfo.iana.timeZoneId;
          }

          callback();
        },
        error: (error) => {
          callback();
        }
      });
  }

  private getBaseHref(): string {
    const baseUrl = this.platformLocation.getBaseHrefFromDOM();
    if (baseUrl) {
      return baseUrl;
    }

    return '/';
  }

  private getHostName(): string {
    const port = document.location.port ? ':' + document.location.port : '';
    return document.location.hostname + port;
  }

  private getDocumentOrigin(): string {
    if (!document.location.origin) {
      const port = document.location.port ? ':' + document.location.port : '';
      return document.location.protocol + '//' + document.location.hostname + port;
    }

    return document.location.origin;
  }

  private shouldLoadLocale(): boolean {
    return cartesian.localization.currentLanguage.name && cartesian.localization.currentLanguage.name !== 'en-US';
  }

  private convertCartesianLocaleToAngularLocale(locale: string): string {
    if (!AppConstants.localeMappings) {
      return locale;
    }

    const localeMapings = _.filter(AppConstants.localeMappings, {
      from: locale
    });
    if (localeMapings && localeMapings.length) {
      return localeMapings[0].to;
    }

    return locale;
  }

  private getCurrentClockProvider(currentProviderName: string): cartesian.timing.IClockProvider {
    if (currentProviderName === 'unspecifiedClockProvider') {
      return cartesian.timing.unspecifiedClockProvider;
    }

    if (currentProviderName === 'utcClockProvider') {
      return cartesian.timing.utcClockProvider;
    }

    return cartesian.timing.localClockProvider;
  }
}
