import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
} from '@angular/router';
import { ProfileService } from '../services/profile.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private loggedIn = false;

  constructor(
    private profileService: ProfileService,
    private router: Router,
  ) {
    this.init();
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.loggedIn && route.routeConfig.path === 'create') {
      const parentPathSegments = route.parent.url.map((segment) => segment.path);
      this.router.navigate(parentPathSegments);
    }
    return this.loggedIn;
  }

  private init() {
    this.profileService.getProfile()
      .subscribe((profile) => this.loggedIn = !!profile);
  }
}
