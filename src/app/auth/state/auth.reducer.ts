import { createReducer, on } from '@ngrx/store';
import { initialAuthState } from './auth.state';
import { logoff, logonFailure, logonSuccess } from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,
  // on successful logon, set the logged on user as current user
  on(logonSuccess, (state, { user }) => ({
    ...state,
    currentUser: user,
    logonError: null,
  })),
  // on logon, failure clear current user, and set logon error
  on(logonFailure, (state) => ({
    ...state,
    currentUser: null,
    logonError: 'Invalid user ID or password!',
  })),
  // on logoff, clear current user and logon error
  on(logoff, (state) => ({ ...state, currentUser: null, logonError: null }))
);
