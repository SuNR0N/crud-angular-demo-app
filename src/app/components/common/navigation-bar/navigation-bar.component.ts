import {
  Component,
  OnInit,
} from '@angular/core';

import { AuthService } from '../../../api/auth.service';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  public isNavbarCollapsed = true;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
  ) { }

  ngOnInit() {
    this.authService.getProfile()
      .subscribe((profile) => {
        this.profileService.setProfile(profile);
      });
  }

  get profile$() {
    return this.profileService.getProfile();
  }
}
