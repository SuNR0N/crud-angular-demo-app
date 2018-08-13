import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../../api/auth.service';
import { ProfileService } from '../../../services/profile.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent extends BaseComponent {
  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    super();
  }

  logOut() {
    this.authService.logOut()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        () => {
          this.router.navigate([this.router.url]);
          this.profileService.clear();
        },
        (err) => this.toastr.error(err),
      );
  }

  get profile$() {
    return this.profileService.getProfile();
  }
}
