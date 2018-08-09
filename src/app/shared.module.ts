import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import {
  ActionBarComponent,
  ActionCellComponent,
  ConfirmationModalComponent,
  IconButtonComponent,
  IconComponent,
  ReadOnlyFormGroupComponent,
  TextFieldComponent,
} from './components/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ActionBarComponent,
    ActionCellComponent,
    IconButtonComponent,
    IconComponent,
    ReadOnlyFormGroupComponent,
    TextFieldComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ActionBarComponent,
    ActionCellComponent,
    ConfirmationModalComponent,
    IconButtonComponent,
    IconComponent,
    ReadOnlyFormGroupComponent,
    TextFieldComponent,
  ],
  entryComponents: [
    ConfirmationModalComponent,
  ],
})
export class SharedModule { }
