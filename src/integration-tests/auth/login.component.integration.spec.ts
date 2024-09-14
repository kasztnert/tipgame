import {
  ComponentFixture,
  fakeAsync,
  flush,
  flushMicrotasks,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { LoginComponent } from '../../app/auth/login/login.component';
import { AuthModule } from '../../app/auth/auth.module';
import { authReducer } from '../../app/auth/state/auth.reducer';
import { AuthService } from '../../app/auth/auth.service';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../../app/auth/state/auth.effects';
import { AuthState, initialAuthState } from '../../app/auth/state/auth.state';
import { logoff } from '../../app/auth/state/auth.actions';
import { selectAuthState } from '../../app/auth/state/auth.selectors';
import { GameComponent } from '../../app/game/game/game.component';
import { provideRouter, Routes } from '@angular/router';

describe('LoginComponent integration test', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: Store;

  const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'game', component: GameComponent },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AuthModule,
        ReactiveFormsModule,
        StoreModule.forRoot(
          { auth: authReducer },
          { initialState: { auth: initialAuthState } }
        ),
        EffectsModule.forRoot([AuthEffects]),
      ],
      providers: [AuthService, provideRouter(routes)],
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(Store);
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the auth state on logon', fakeAsync(() => {
    store.dispatch(logoff());
    let loggedOff = false;
    store.select(selectAuthState).subscribe((authState) => {
      if (authState.currentUser === null) {
        loggedOff = true;
      }
    });
    flushMicrotasks();
    expect(loggedOff).toBeTrue();

    component.loginForm.controls['userId'].setValue('user2');
    component.loginForm.controls['password'].setValue('pwd2');

    component.onSubmit();
    let loggedOn = false;
    store.select(selectAuthState).subscribe((authState) => {
      if (authState?.currentUser?.userId === 'user2') {
        loggedOn = true;
      }
    });
    flushMicrotasks();
    expect(loggedOn).toBeTrue();
  }));
});
