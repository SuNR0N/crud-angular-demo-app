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
  AbstractControl,
  FormControl,
} from '@angular/forms';

const defaultErrorDefs: { [key: string]: string } = {
  required: 'Required',
};

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
  styleUrls: ['./text-field.component.scss']
})
export class TextFieldComponent implements ControlValueAccessor, Validator {
  @Input() control: FormControl;
  @Input() errorDefs?: { [key: string]: string };
  @Input() id: string;
  @Input() label: string;
  @Input() labelClass?: string;
  @Input() valueClass?: string;
  @Input() value?: string;
  private propagateChange = (_: any) => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void { }

  onChange(event: any) {
    this.propagateChange(event.target.value);
  }

  onKeyUp(event: any) {
    this.propagateChange(event.target.value);
  }

  validate(c: AbstractControl) {
    return c.validator;
  }

  get errorMessage(): string | undefined {
    const errorDefs = {
      ...defaultErrorDefs,
      ...this.errorDefs,
    };
    if (this.control && this.control.errors) {
      return Object.entries(errorDefs)
        .filter(([error]) => !!this.control.errors[error])
        .map(([_, message]) => message)[0];
    }
  }

  get isInvalid() {
    return this.control && !this.control.pristine && this.control.invalid;
  }

  get isValid() {
    return this.control && !this.control.pristine && this.control.valid;
  }
}
