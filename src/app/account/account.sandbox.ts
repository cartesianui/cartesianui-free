import { Injectable, Injector } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Sandbox } from '@cartesianui/common';
import { State } from '..//app.store';
import { AuthToken, AuthUser, LoginForm, UserRegistrationForm } from './models';
import { actions, selectors as fromAccountSelectors } from './store';

@Injectable()
export class AccountSandbox extends Sandbox {
  public authToken$ = this.store.pipe(select(fromAccountSelectors.getAuthToken));

  constructor(
    protected store: Store<State>,
    protected override injector: Injector
  ) {
    super(injector);
  }

  public authenticate(form: LoginForm): void {
    this.store.dispatch(actions.doAuthenticate({ loginForm: form }));
  }

  public setAuthenticatedUser(user: AuthUser): void {
    this.store.dispatch(actions.doAddAuthUser({ user }));
  }

  public setAuthToken(token: AuthToken): void {
    this.store.dispatch(actions.doAddAuthToken({ token }));
  }

  public register(form: UserRegistrationForm): void {
    this.store.dispatch(actions.doRegister({ registerForm: form }));
  }
}
