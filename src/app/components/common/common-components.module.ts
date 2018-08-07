import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconComponent } from './icon/icon.component';
import { ReadOnlyFormGroupComponent } from './read-only-form-group/read-only-form-group.component';
import { ActionBarComponent } from './action-bar/action-bar.component';
import { ActionCellComponent } from './action-cell/action-cell.component';

@NgModule({
  imports: [ CommonModule ],
  exports: [
    ActionBarComponent,
    ActionCellComponent,
    IconComponent,
    ReadOnlyFormGroupComponent,
  ],
  declarations: [
    ActionBarComponent,
    ActionCellComponent,
    IconComponent,
    ReadOnlyFormGroupComponent,
  ],
})
export class CommonComponentsModule { }
