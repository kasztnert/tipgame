import { createAction, props } from '@ngrx/store';

export const toggleNumber = createAction(
  '[Game] Toggle number',
  props<{ sheetNumber: number; number: number; checked: boolean }>()
);

export const randomizeTipSheet = createAction(
  '[Game] Randomize',
  props<{ sheetNumber: number; total: number; nofTips: number }>()
);

export const clearTipSheet = createAction(
  '[Game] Clear',
  props<{ sheetNumber: number }>()
);

export const updateTipSheet = createAction(
  '[Game] Update tip sheet',
  props<{ sheetNumber: number; checkedNumbers: Set<number> }>()
);
