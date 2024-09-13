import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthState } from './auth.state';
import { Store } from '@ngrx/store';
import { logoff, logon, logonFailure, logonSuccess } from './auth.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  // this effect authenticates the user in the authservice,
  // and dispatches the logonSuccess, or logonFailure actions
  logon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logon),
      switchMap(({ logonData }) =>
        this.authService.authenticate(logonData).pipe(
          map((user: User | null) =>
            user ? logonSuccess({ user }) : logonFailure()
          ),
          catchError(() => of(logonFailure()))
        )
      )
    )
  );

  // on successful logon, navigate to /game
  logonSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logonSuccess),
        tap(() => this.router.navigate(['/game']))
      ),
    { dispatch: false }
  );

  // TODO: logoff is not used yet, it should be bound to an event on the UI
  logoffSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoff),
        tap(() => this.router.navigate(['/login']))
      ),
    { dispatch: false }
  );
}
