import { createReducer, on } from '@ngrx/store';
import { initialGameState } from './game.state';
import {
  randomizeTipSheet,
  toggleNumber,
  updateTipSheet,
} from './game.actions';
import { enableMapSet, produce } from 'immer';

enableMapSet(); // required for immer

export const gameReducer = createReducer(
  initialGameState,
  // add or remove the toggled number on a sheet
  on(toggleNumber, (state, { sheetNumber, number, checked }) =>
    produce(state, (draftState) => {
      if (checked) {
        draftState.checkedNumbers[sheetNumber].add(number);
      } else {
        draftState.checkedNumbers[sheetNumber].delete(number);
      }
    })
  ),
  // change all the tips on a sheet (used by randomize and clear)
  on(updateTipSheet, (state, { sheetNumber, checkedNumbers }) =>
    produce(state, (draftState) => {
      draftState.checkedNumbers[sheetNumber] = checkedNumbers;
    })
  )
);
