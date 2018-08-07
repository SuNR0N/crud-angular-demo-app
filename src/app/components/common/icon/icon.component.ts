import {
  Component,
  Input,
} from '@angular/core';

export type IconSymbol =
  'angle-double-left-solid' |
  'angle-double-right-solid' |
  'angle-left-solid' |
  'angle-right-solid' |
  'angular-brands' |
  'calendar-alt-regular' |
  'edit-regular' |
  'eye-regular' |
  'github-brands' |
  'plus-square-regular' |
  'spinner-solid' |
  'trash-alt-regular';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent {
  @Input() flip = false;
  @Input() spin = false;
  @Input() symbol: IconSymbol;
  spritePath = '../../../../assets/icons/sprite.svg';
}
