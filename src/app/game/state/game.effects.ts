import { inject, Injectable } from '@angular/core';
import { GameService } from '../game/game.service';
import { GameState } from './game.state';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  clearTipSheet,
  randomizeTipSheet,
  updateTipSheet,
} from './game.actions';
import { mergeMap, of, tap } from 'rxjs';

@Injectable()
export class GameEffects {
  private actions$ = inject(Actions);
  private gameService = inject(GameService);

  // Initiate generation of random tips.
  randomizeSheet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(randomizeTipSheet),
      mergeMap(({ sheetNumber, total, nofTips }) => {
        const newCheckedNumbers = this.gameService.generateRandomTips(
          nofTips,
          total
        );
        return of(
          updateTipSheet({
            sheetNumber: sheetNumber,
            checkedNumbers: newCheckedNumbers,
          })
        );
      })
    )
  );

  // Initiate clearing of a tip sheet
  clearSheet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clearTipSheet),
      mergeMap(({ sheetNumber }) =>
        of(
          updateTipSheet({
            sheetNumber: sheetNumber,
            checkedNumbers: new Set<number>(),
          })
        )
      )
    )
  );
}
