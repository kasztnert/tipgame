import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

export interface CheckChangeEventArgs {
  checked: boolean;
  number: number;
}

@Component({
  selector: 'app-tip-checkbox',
  templateUrl: './tip-checkbox.component.html',
  styleUrl: './tip-checkbox.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TipCheckboxComponent {
  @Input()
  number = 0;

  @Input()
  isChecked = false;

  @Output()
  checkChange = new EventEmitter<CheckChangeEventArgs>();

  toggle() {
    this.isChecked = !this.isChecked;
    this.checkChange.emit({ checked: this.isChecked, number: this.number });
  }
}
