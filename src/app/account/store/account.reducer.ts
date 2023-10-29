import { Action, createReducer, on } from '@ngrx/store';
import { AuthToken, AuthUser } from '../models';
import * as fromAccountActions from './account.action';

export interface AccountState {
  user: AuthUser | null;
  token: AuthToken | null;
}

const INITIAL_STATE: AccountState = {
  user: null,
  token: null
};

const createAccountReducers = createReducer(
  INITIAL_STATE,
  on(fromAccountActions.doAuthenticateSuccess, (state, { authToken }) => {
    return Object.assign({}, state, {
      token: authToken
    });
  }),
  on(fromAccountActions.doRegisterSuccess, (state, { user }) => {
    return Object.assign({}, state, {
      user
    });
  }),
  on(fromAccountActions.doFetchAuthUserSuccess, fromAccountActions.doAddAuthUser, (state, { user }) => {
    return Object.assign({}, state, {
      user
    });
  }),
  on(fromAccountActions.doAddAuthToken, (state, { token }) => {
    return Object.assign({}, state, {
      token
    });
  }),
  on(fromAccountActions.doLogoutSuccess, (state) => {
    return Object.assign({}, state, INITIAL_STATE);
  }),
  on(fromAccountActions.doAuthenticateFail, fromAccountActions.doFetchAuthUserFail, (state) => {
    return Object.assign({}, state, { user: null, token: null });
  })
);

export function reducer(state: AccountState | undefined, action: Action) {
  return createAccountReducers(state, action);
}
