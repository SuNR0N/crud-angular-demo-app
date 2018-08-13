import {
  Component,
  Input,
} from '@angular/core';

import { IconSymbol } from '../icon/icon.component';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
})
export class SpinnerComponent {
  @Input() symbol: IconSymbol = 'spinner-solid';
  @Input() text = 'Loading';
}
