import { Component, ChangeDetectionStrategy, Injector, OnInit, OnDestroy } from '@angular/core';
import { FormBaseComponent } from '@cartesianui/common';
import { FormControl, FormGroup } from '@angular/forms';
import { accountModuleAnimation } from '@cartesianui/common';
import { AccountService } from '@app/account/shared';
import { AccountSandbox } from '../../account.sandbox';
import { AuthToken, AuthUser, LoginForm } from '../../models';
import { AppInitializerService } from '@app/app-initializer.service';

@Component({
  selector: 'app-account',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [accountModuleAnimation()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent extends FormBaseComponent<AuthUser> implements OnInit, OnDestroy {
  constructor(
    injector: Injector,
    public sb: AccountSandbox,
    private accountService: AccountService,
    private appInitializer: AppInitializerService
  ) {
    super(injector);
    this.formGroup = new FormGroup({
      email: new FormControl('', []),
      password: new FormControl('', []),
      remember: new FormControl(false)
    });
  }

  ngOnInit(): void {
    this.addSubscriptions();
  }

  addSubscriptions(): void {
    this.subscriptions.push(
      this.sb.authToken$.subscribe((token: boolean | AuthToken) => {
        if (token) {
          // This is the only place token is utilized from Account State
          // AuthService will save access token in cookie, and it will always be used from there
          // In case of page load, Account State don't persists
          // SessionService will be used else where to make session persistent
          this.accountService.processAuthenticateResult(token as AuthToken).then(
            (logged) => {
              if (logged) {
                this.appInitializer
                  .init(true)()
                  .then((user) => {
                    if (user) {
                      this.sb.setAuthenticatedUser(user as AuthUser);
                      this.router.navigate(['/']);
                    }
                  });
              }
            },
            (err) => {}
          );
        }
      })
    );
  }

  get isSelfRegistrationAllowed(): boolean {
    return true;
  }

  login(): void {
    if (this.formGroup.valid) {
      const form = new LoginForm();
      form.email = this.formGroup.controls.email.value;
      form.password = this.formGroup.controls.password.value;
      // form.remember = this.formGroup.controls['remember'].value;
      this.sb.authenticate(form);
    }
  }
}
