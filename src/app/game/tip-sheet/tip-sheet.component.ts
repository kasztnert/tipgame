import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { GameService } from '../game/game.service';
import { CheckChangeEventArgs } from '../../shared/custom-widgets/tip-checkbox/tip-checkbox.component';
import { map, Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { GameState } from '../state/game.state';
import {
  clearTipSheet,
  randomizeTipSheet,
  toggleNumber,
} from '../state/game.actions';
import { NofTips } from '../../shared/constants';
import { selectCheckedNumbers } from '../state/game.selectors';

@Component({
  selector: 'app-tip-sheet',
  templateUrl: './tip-sheet.component.html',
  styleUrl: './tip-sheet.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TipSheetComponent {
  @Input()
  sheetNumber = 0;
  @Input()
  rows = 0;
  @Input()
  columns = 0;

  @Output()
  changed = new EventEmitter();

  checkedNumbers$: Observable<Set<number>>;
  _numbers: number[] = []; // numbers from 1 to rows * columns, only used in ngFor
  constructor(
    private gameService: GameService,
    private store: Store<GameState>
  ) {
    this.checkedNumbers$ = this.store.select(selectCheckedNumbers).pipe(
      map((value) => value[this.sheetNumber]),
      tap(() => this.changed.emit())
    );
  }
  get numbers() {
    if (!this._numbers?.length) {
      this._numbers = Array.from(
        { length: this.rows * this.columns },
        (_, i) => i + 1
      );
    }
    return this._numbers;
  }
  getGridColumnClass(): string {
    return `grid-cols-${this.columns}`;
  }
  randomize() {
    this.store.dispatch(
      randomizeTipSheet({
        sheetNumber: this.sheetNumber,
        total: this.rows * this.columns,
        nofTips: NofTips,
      })
    );
  }
  clear() {
    this.store.dispatch(
      clearTipSheet({
        sheetNumber: this.sheetNumber,
      })
    );
  }
  onCheckChange(event: CheckChangeEventArgs) {
    this.store.dispatch(
      toggleNumber({
        sheetNumber: this.sheetNumber,
        number: event.number,
        checked: event.checked,
      })
    );
  }
}
