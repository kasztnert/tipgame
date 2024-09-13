import { NofSheetColumns, NofSheetRows } from '../../shared/constants';

export interface GameState {
  checkedNumbers: Set<number>[];
}

export const initialGameState: GameState = {
  checkedNumbers: initGameState(),
};

function initGameState(): Set<number>[] {
  let retval: Set<number>[] = [];
  // generate an array with 1-based indices, so it can be
  // addressed directly with the sheet number
  for (let i = 1; i <= NofSheetRows * NofSheetColumns; ++i) {
    retval[i] = new Set<number>();
  }
  return retval;
}
