import {
  AuthActions,
  SET_UNAUTHENTICATED,
  SET_AUTHENTICATED
} from './auth.actions';

export interface State {
  isAuthenticated: boolean;
}

const initialState: State = {
  isAuthenticated: false
};

export function authReducer(
  state: State = initialState,
  action: AuthActions
): State {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        isAuthenticated: true
      };
    case SET_UNAUTHENTICATED:
      return {
        isAuthenticated: false
      };

    default:
      return state;
  }
}

export const getIsAuthenticated = (state: State) => state.isAuthenticated;
