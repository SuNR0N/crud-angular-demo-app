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
import { AuthGuard } from './guards/auth-guard.service';
import { DatePipe } from './pipes/date.pipe';

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
    DatePipe,
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
    DatePipe,
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
  providers: [
    AuthGuard,
  ],
})
export class SharedModule { }
