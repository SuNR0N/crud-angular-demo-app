import {
  Component,
  OnInit,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../../../api/auth.service';
import { ProfileService } from '../../../services/profile.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
})
export class NavigationBarComponent extends BaseComponent implements OnInit {
  public isNavbarCollapsed = true;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
  ) {
    super();
  }

  ngOnInit() {
    this.authService.getProfile()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((profile) => {
        this.profileService.setProfile(profile);
      });
  }

  get profile$() {
    return this.profileService.getProfile();
  }
}
