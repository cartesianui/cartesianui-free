import { createAction, props } from '@ngrx/store';
import { AuthUser, AuthToken, LoginForm, UserRegistrationForm } from '../models';
import { type } from '@cartesianui/core';

/**
 * Login Actions
 */
export const doAuthenticate = createAction(type('[Account] Do Authenticate'), props<{ loginForm: LoginForm }>());
export const doAuthenticateSuccess = createAction(type('[Account] Do Authenticate Success'), props<{ authToken: AuthToken }>());
export const doAuthenticateFail = createAction(type('[Account] Do Authenticate Fail'));
// export const doAddAuthToken = createAction(type('[Account] Add Auth Token'), props<{ authToken: AuthToken }>());
// export const doRemoveAuthToken = createAction(type('[Account] Remove Auth Token'), props<{ authToken: AuthToken }>());

/**
 * AuthUser Actions
 */
export const doFetchAuthUser = createAction(type('[Account] Fetch Authenticated User'));
export const doFetchAuthUserSuccess = createAction(type('[Account] Fetch Authenticated User Success'), props<{ user: AuthUser }>());
export const doFetchAuthUserFail = createAction(type('[Account] Fetch Authenticated User Fail'));
export const doAddAuthUser = createAction(type('[Account] Add Auth User <AuthUser>'), props<{ user: AuthUser }>());
export const doAddAuthToken = createAction(type('[Account] Add Auth Token <AuthUser>'), props<{ token: AuthToken }>());
// export const doRemoveAuthenticatedUser = createAction(type('[Account] Remove Authenticated AuthUser'), props<{ user: AuthUser }>());

/**
 * Register Actions
 */
export const doRegister = createAction(type('[Account] Do Register'), props<{ registerForm: UserRegistrationForm }>());
export const doRegisterSuccess = createAction(type('[Account] Do Register Success'), props<{ user: AuthUser }>());
export const doRegisterFail = createAction(type('[Account] Do Register Fail'));

/**
 * Logout Actions
 */
export const doLogout = createAction(type('[Account] Do Logout'));
export const doLogoutSuccess = createAction(type('[Account] Do Logout Success'));
export const doLogoutFail = createAction(type('[Account] Do Logout Fail'));
