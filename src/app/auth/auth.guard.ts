import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from './state/auth.state';
import { selectCurrentUser } from './state/auth.selectors';
import { map, take } from 'rxjs';
import { AuthGuardEnabled } from '../shared/constants';

export const authGuard: CanActivateFn = (route, state) => {
  if (!AuthGuardEnabled) {
    return true;
  }
  const store = inject(Store<AuthState>);
  const router = inject(Router);
  return store.select(selectCurrentUser).pipe(
    take(1), // take the first emission, and unsibscribe
    map((currentUser) => {
      if (!currentUser) {
        router.navigate(['/login']);
        return false;
      }
      return true;
    })
  );
};
