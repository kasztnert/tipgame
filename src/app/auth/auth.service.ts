import { Injectable } from '@angular/core';
import { AuthState } from './state/auth.state';
import { Store } from '@ngrx/store';
import { LogonData, User } from '../shared/models/user.model';
import { filter, map, Observable } from 'rxjs';
import { selectAllUsers } from './state/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private store: Store<AuthState>) {}

  /**
   * Authenticates the user 
   * @param logonData 
   * @returns An Observable holding the logged on User object, or null on logon failure
   */
  authenticate(logonData: LogonData): Observable<User | null> {
    let users: User[];
    return this.store.select(selectAllUsers).pipe(
      map((users) => {
        return users.find((u) => u.userId == logonData.userId && u.password == logonData.password) || null;
      })
    );
  }
}
