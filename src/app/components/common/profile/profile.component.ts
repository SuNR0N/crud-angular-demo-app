import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../api/auth.service';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router,
  ) { }

  logOut() {
    this.authService.logOut()
      .subscribe(() => {
        this.router.navigate([this.router.url]);
        this.profileService.clear();
      });
  }

  get profile$() {
    return this.profileService.getProfile();
  }
}
