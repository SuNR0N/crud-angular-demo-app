import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import {
  ActionBarComponent,
  ActionCellComponent,
  ConfirmationModalComponent,
  DateFieldComponent,
  DropdownFieldComponent,
  FieldComponent,
  IconButtonComponent,
  IconComponent,
  PaginationComponent,
  ReadOnlyFieldComponent,
  SpinnerComponent,
  TemplateFieldComponent,
  TextFieldComponent,
} from './components/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbModule,
  ],
  exports: [
    ActionBarComponent,
    ActionCellComponent,
    DateFieldComponent,
    DropdownFieldComponent,
    IconButtonComponent,
    IconComponent,
    PaginationComponent,
    ReadOnlyFieldComponent,
    SpinnerComponent,
    TemplateFieldComponent,
    TextFieldComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ActionBarComponent,
    ActionCellComponent,
    ConfirmationModalComponent,
    DateFieldComponent,
    DropdownFieldComponent,
    FieldComponent,
    IconButtonComponent,
    IconComponent,
    PaginationComponent,
    ReadOnlyFieldComponent,
    SpinnerComponent,
    TemplateFieldComponent,
    TextFieldComponent,
  ],
  entryComponents: [
    ConfirmationModalComponent,
  ],
})
export class SharedModule { }
