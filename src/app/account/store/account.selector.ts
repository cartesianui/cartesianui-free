import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { AccountState } from './account.reducer';
import { AuthToken, AuthUser } from '../models';

export const getAccountState = createFeatureSelector<AccountState>('account');
export const getAuthToken: MemoizedSelector<object, AuthToken | boolean> = createSelector(getAccountState, (state: AccountState) => state.token ?? false);
export const getAuthUser: MemoizedSelector<object, AuthUser | boolean> = createSelector(getAccountState, (state: AccountState) => state.user ?? false);