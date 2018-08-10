import {
  Component,
  Input,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  Validator,
} from '@angular/forms';
import { FieldComponent } from '../field/field.component';

@Component({
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    class: 'dropdown-field form-group row',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownFieldComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DropdownFieldComponent),
      multi: true,
    },
  ],
  selector: 'app-dropdown-field',
  templateUrl: './dropdown-field.component.html',
})
export class DropdownFieldComponent extends FieldComponent implements ControlValueAccessor, Validator {
  @Input() clearText = 'Clear';
  @Input() labelProperty = 'name';
  @Input() options: any[];
  @Input() placeholder = 'Please select...';
  @Input() valueClass?: string;
  @Input() valueProperty = 'id';

  onChange(values: any[]) {
    const selectedValues = values.map((value) => value[this.valueProperty]);
    this.propagateChange(selectedValues);
  }
}
