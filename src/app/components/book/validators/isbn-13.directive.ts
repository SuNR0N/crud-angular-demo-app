import {
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

export function isbn13Validator(control: AbstractControl): ValidationErrors | null {
  if (control.value.length === 13) {
    const digits = control.value
      .split('')
      .map(Number);
    const sum = digits.reduce((previous, current, index) => {
      previous += (index % 2 === 1 ? 3 * current : current);
      return previous;
    }, 0);
    return sum % 10 === 0 ? null : { isbn13: true };
  } else {
    return null;
  }
}
