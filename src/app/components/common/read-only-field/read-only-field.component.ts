import {
  Component,
  Input,
} from '@angular/core';

import { FieldComponent } from '../field/field.component';

@Component({
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    class: 'form-group row',
  },
  selector: 'app-read-only-field',
  templateUrl: './read-only-field.component.html',
})
export class ReadOnlyFieldComponent extends FieldComponent {
  @Input() values?: string[];
}
