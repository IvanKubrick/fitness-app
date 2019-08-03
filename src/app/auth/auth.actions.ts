import { Action } from '@ngrx/store';

export const SET_AUTHENTICATED: string = '[Auth] Set Authenticated';
export const SET_UNAUTHENTICATED: string = '[Auth] Set Unuthenticated';

export class SetAuthenticated implements Action {
  readonly type: string = SET_AUTHENTICATED;
}

export class SetUnauthenticated implements Action {
  readonly type: string = SET_UNAUTHENTICATED;
}

export type AuthActions = SetAuthenticated | SetUnauthenticated;
