import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { User } from '../model/user.model';
import { AuthActions } from '../store/auth-types';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User
}

export const InitialAuthState: AuthState = {
  user: undefined
}
// reducer function
// calculates new state based on previous state and action called
export const authReducer = createReducer(
  InitialAuthState,
  on(AuthActions.login, 
    (state, action) => {
      return {
        user: action.user
      };
    }
  ),
  on(AuthActions.logout,
    (state, action) => {
      return {
        user: undefined
      }
    } 
  )
);

