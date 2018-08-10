import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
    TemplateFieldComponent,
    TextFieldComponent,
  ],
  entryComponents: [
    ConfirmationModalComponent,
  ],
})
export class SharedModule { }
