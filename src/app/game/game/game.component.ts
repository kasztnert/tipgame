import { Component } from '@angular/core';
import * as Constants from '../../shared/constants';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { GameState } from '../state/game.state';
import { Store } from '@ngrx/store';
import { selectCheckedNumbers } from '../state/game.selectors';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-game',
  // standalone: true,
  // imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.sass',
})
export class GameComponent {
  tipRows = Constants.TipRows;
  tipColumns = Constants.TipColumns;
  sheetRows = Constants.NofSheetRows;
  sheetColumns = Constants.NofSheetColumns;
  result$: Observable<string[]>;
  resultVisible$ = new BehaviorSubject<boolean>(false);

  constructor(private store: Store<GameState>, public titleService: Title) {
    this.result$ = store.select(selectCheckedNumbers).pipe(
      map((results) => {
        return results.map((value, index) => {
          let retval = `Panel ${index}: `;
          if (value.size <= 0) {
            retval += 'empty';
          } else if (value.size > Constants.NofTips) {
            retval += `Error: Please remove ${
              value.size - Constants.NofTips
            } marks!`;
          } else if (value.size < Constants.NofTips) {
            retval += `Error: Please add ${
              Constants.NofTips - value.size
            } marks!`;
          } else {
            retval += Array.from(value).join(', ');
          }
          return retval;
        });
      })
    );
  }

  _numbers: number[] = []; // numbers from 1 to rows * columns, only used in ngFor
  get numbers() {
    if (!this._numbers?.length) {
      this._numbers = Array.from(
        { length: this.sheetRows * this.sheetColumns },
        (_, i) => i + 1
      );
    }
    return this._numbers;
  }

  play() {
    this.resultVisible$.next(true);
  }
  onSheetChanged() {
    this.resultVisible$.next(false);
  }
}
