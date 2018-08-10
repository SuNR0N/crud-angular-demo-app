import {
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

export function isbn10Validator(control: AbstractControl): ValidationErrors | null {
  if (control.value.length === 10) {
    const digits = control.value
      .split('')
      .map((digit) => digit === 'X' ? 10 : parseInt(digit, 10));
    const sum = digits.reduce((previous, current, index) => {
      previous += (current * (index + 1));
      return previous;
    }, 0);
    return sum % 11 === 0 ? null : { isbn10: true };
  } else {
    return null;
  }
}
