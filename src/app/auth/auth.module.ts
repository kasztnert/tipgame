import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './state/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/auth.effects';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature('auth', authReducer ),
    EffectsModule.forFeature([AuthEffects]),
  ],
  exports: [LoginComponent],
})
export class AuthModule {}
