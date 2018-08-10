import {
  Component,
  Input,
} from '@angular/core';

import { IconSymbol } from '../icon/icon.component';

@Component({
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    class: 'icon-button',
  },
  // tslint:disable-next-line:component-selector
  selector: '[appIconButton]',
  templateUrl: './icon-button.component.html',
})
export class IconButtonComponent {
  @Input() symbol?: IconSymbol;
  @Input() text?: string;
}
