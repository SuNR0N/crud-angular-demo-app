import {
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  ControlValueAccessor,
  Validator,
} from '@angular/forms';
import {
  NgbDateStruct,
  NgbDateAdapter,
} from '@ng-bootstrap/ng-bootstrap';

import { NgbDateStringAdapter } from './ngb-date-string-adapter';
import { FieldComponent } from '../field/field.component';

@Component({
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    class: 'form-group row',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateFieldComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DateFieldComponent),
      multi: true,
    },
    {
      provide: NgbDateAdapter,
      useClass: NgbDateStringAdapter,
    },
  ],
  selector: 'app-date-field',
  templateUrl: './date-field.component.html',
})
export class DateFieldComponent extends FieldComponent implements ControlValueAccessor, Validator {
  @Input() placeholder = 'YYYY-MM-DD';

  constructor(private ngbDateAdapter: NgbDateAdapter<string>) {
    super();
  }

  onKeyUp(event: any) {
    const ms = Date.parse(event.target.value);
    if (Number.isNaN(ms)) {
      this.propagateChange(null);
    } else {
      const date = new Date(ms);
      this.propagateChange(this.ngbDateAdapter.toModel({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
      }));
    }
  }

  onSelect(date: NgbDateStruct) {
    this.propagateChange(this.ngbDateAdapter.toModel(date));
  }
}
