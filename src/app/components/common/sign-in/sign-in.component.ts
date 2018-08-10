import { Component } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

import { GITHUB_OAUTH_URL } from '../../../config/config';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
})
export class SignInComponent {
  public authLink = GITHUB_OAUTH_URL;

  constructor(config: NgbDropdownConfig) {
    config.placement = 'bottom-right';
  }
}
