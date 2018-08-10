import {
  Component,
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
    class: 'form-group row',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextFieldComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TextFieldComponent),
      multi: true,
    },
  ],
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
})
export class TextFieldComponent extends FieldComponent implements ControlValueAccessor, Validator {
  onChange(event: any) {
    this.propagateChange(event.target.value);
  }

  onKeyUp(event: any) {
    this.propagateChange(event.target.value);
  }
}
