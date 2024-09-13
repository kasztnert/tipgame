import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectCurrentUser = createSelector(
    selectAuthState,
    state => state.currentUser,
);

export const selectAllUsers = createSelector(
    selectAuthState,
    state => state.users,
);

export const selectLogonError = createSelector(
    selectAuthState,
    state => state.logonError,
)