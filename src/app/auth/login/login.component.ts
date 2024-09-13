import { Component } from '@angular/core';
import { LogonData, User } from '../../shared/models/user.model';
import { Store } from '@ngrx/store';
import { logon } from '../state/auth.actions';
import { map, Observable, tap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { selectLogonError } from '../state/auth.selectors';
import { UserListService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass',
})
export class LoginComponent {
  users$: Observable<User[]>;
  loginForm: FormGroup;
  errorMessage$: Observable<string | null>;

  constructor(
    private store: Store,
    private builder: FormBuilder,
    private userService: UserListService
  ) {
    this.errorMessage$ = this.store.select(selectLogonError);
    this.users$ = userService.userList();
    this.loginForm = this.builder.group({
      userId: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const logonData: LogonData = this.loginForm.value;
    this.store.dispatch(logon({ logonData: logonData }));
  }
  onUserClick(user: User) {
    this.loginForm.patchValue({
      userId: user.userId,
      password: '',
    });
  }
}
