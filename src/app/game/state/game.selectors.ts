import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GameState } from './game.state';

export const selectGameState = createFeatureSelector<GameState>('game');

export const selectCheckedNumbers = createSelector(
  selectGameState,
  (state) => state.checkedNumbers
);
