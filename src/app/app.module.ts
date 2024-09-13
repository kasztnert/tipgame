import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from './shared/shared.module';
import { GameComponent } from './game/game/game.component';
import { TipSheetComponent } from './game/tip-sheet/tip-sheet.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgIconsModule } from '@ng-icons/core';
import { faSolidShuffle, faSolidTrashCan } from '@ng-icons/font-awesome/solid';
import { authReducer } from './auth/state/auth.reducer';
import { gameReducer } from './game/state/game.reducer';
import { GameEffects } from './game/state/game.effects';

@NgModule({
  declarations: [AppComponent, GameComponent, TipSheetComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    RouterModule,
    StoreModule.forRoot({
      auth: authReducer,
      game: gameReducer,
    }),
    EffectsModule.forRoot([GameEffects]),
    FontAwesomeModule,
    NgIconsModule.withIcons({ faSolidShuffle, faSolidTrashCan }),

    AuthModule,
    SharedModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
