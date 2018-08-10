import {
  Component,
  ContentChild,
  TemplateRef,
} from '@angular/core';
import { FieldComponent } from '../field/field.component';

@Component({
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    class: 'form-group row',
  },
  selector: 'app-template-field',
  templateUrl: './template-field.component.html',
})
export class TemplateFieldComponent extends FieldComponent {
  @ContentChild(TemplateRef) templateRef: TemplateRef<any>;
}
