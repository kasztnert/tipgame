import { NgModule } from '@angular/core';
import { TipCheckboxComponent } from './custom-widgets/tip-checkbox/tip-checkbox.component';
import { TipSheetComponent } from '../game/tip-sheet/tip-sheet.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [TipCheckboxComponent],
  imports: [CommonModule],
  exports: [TipCheckboxComponent],
})
export class SharedModule {}
