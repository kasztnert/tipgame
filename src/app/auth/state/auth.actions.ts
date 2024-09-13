import { createAction, props } from '@ngrx/store';
import { LogonData, User } from '../../shared/models/user.model';

export const logon = createAction('[Auth] Logon', props<{ logonData: LogonData }>());

export const logonSuccess = createAction(
  '[Auth] Logon success',
  props<{ user: User }>()
);
export const logonFailure = createAction('[Auth] Logon failure');
export const logoff = createAction('[Auth] logoff');
