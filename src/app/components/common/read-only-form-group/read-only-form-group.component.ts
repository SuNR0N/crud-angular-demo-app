import {
  Component,
  Input,
} from '@angular/core';

@Component({
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    class: 'form-group row',
  },
  selector: 'app-read-only-form-group',
  templateUrl: './read-only-form-group.component.html',
  styleUrls: ['./read-only-form-group.component.scss']
})
export class ReadOnlyFormGroupComponent {
  @Input() id: string;
  @Input() label: string;
  @Input() labelClass?: string;
  @Input() value?: string;
  @Input() valueClass?: string;
  @Input() values?: string[];
}
