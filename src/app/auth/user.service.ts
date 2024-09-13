import { Injectable } from '@angular/core';
import { AuthState } from './state/auth.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../shared/models/user.model';
import { selectAllUsers } from './state/auth.selectors';

@Injectable({ providedIn: 'root' })
export class UserListService {
  constructor(private store: Store<AuthState>) {}

  /**
   * Get the list of all users
   * @returns A User array containing all users
   */
  userList(): Observable<User[]> {
    return this.store.select(selectAllUsers);
  }
}
