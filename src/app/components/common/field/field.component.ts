import {
  Component,
  Input,
} from '@angular/core';
import {
  ControlValueAccessor,
  Validator,
  AbstractControl,
  FormControl,
} from '@angular/forms';

const defaultErrorDefs: { [key: string]: string } = {
  required: 'Required',
};

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
})
export class FieldComponent implements ControlValueAccessor, Validator {
  @Input() control: FormControl;
  @Input() errorDefs?: { [key: string]: string };
  @Input() id: string;
  @Input() label: string;
  @Input() labelClass?: string;
  @Input() value?: any;
  @Input() valueClass?: string;
  protected propagateChange = (_: any) => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void { }

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

  get labelId() {
    return `${this.id}Label`;
  }
}
