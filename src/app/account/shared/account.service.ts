import { Injectable } from '@angular/core';
import { AppConstants } from '@cartesianui/core';
import { TokenService, LogService } from '@cartesianui/core';
import { AuthToken, LoginForm } from '../models';

@Injectable()
export class AccountService {
  authenticateModel: LoginForm;
  authenticateResult: AuthToken;
  rememberMe: boolean;

  constructor(
    private tokenService: TokenService,
    private logService: LogService
  ) {
    this.clear();
  }

  logout(reload?: boolean): void {
    this.tokenService.clearToken();
    if (reload !== false) {
      location.href = AppConstants.appBaseUrl;
    }
  }

  public processAuthenticateResult(authenticateResult: AuthToken) {
    this.authenticateResult = authenticateResult;
    return new Promise<boolean>((resolve, reject) => {
      if (authenticateResult.accessToken) {
        this.login(authenticateResult.accessToken, authenticateResult.refreshToken, authenticateResult.expiresIn, this.rememberMe, () => {
          resolve(true);
        });
      } else {
        this.logService.warn('Unexpected Authenticate Result!');
        resolve(false);
      }
    });
  }

  private login(accessToken: string, refreshToken: string, expiresIn: number, rememberMe: boolean, callback): void {
    const tokenExpireDate = rememberMe ? new Date(new Date().getTime() + 1000 * expiresIn) : undefined;

    this.tokenService.setToken(accessToken, tokenExpireDate);

    callback();
  }

  private clear(): void {
    this.authenticateModel = new LoginForm();
    this.authenticateModel.remember = false;
    this.authenticateResult = null;
    this.rememberMe = false;
  }
}
