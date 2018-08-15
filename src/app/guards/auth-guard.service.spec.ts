import { ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';

import { AuthGuard } from './auth-guard.service';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let profileServiceSpy: { getProfile: jasmine.Spy };
  let routerSpy: { navigate: jasmine.Spy };

  beforeEach(() => {
    profileServiceSpy = jasmine.createSpyObj('ProfileService', ['getProfile']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  });

  describe('canActivate', () => {
    const routeMock = {
      routeConfig: {
        path: 'foo',
      },
    } as ActivatedRouteSnapshot;

    it('should return true if the user is logged in', () => {
      profileServiceSpy.getProfile.and.returnValue(of({}));
      authGuard = new AuthGuard(profileServiceSpy as any, routerSpy as any);

      expect(authGuard.canActivate(routeMock)).toBe(true);
    });

    it('should return false if the user is not logged in', () => {
      profileServiceSpy.getProfile.and.returnValue(of(null));
      authGuard = new AuthGuard(profileServiceSpy as any, routerSpy as any);

      expect(authGuard.canActivate(routeMock)).toBe(false);
    });

    it('should navigate to the parent page if the user is not logged in but wants to access a create page', () => {
      const editRouteMock = {
        parent: {
          url: [
            { path: 'foo' },
          ],
        },
        routeConfig: {
          path: 'create',
        },
      } as ActivatedRouteSnapshot;
      profileServiceSpy.getProfile.and.returnValue(of(null));
      authGuard = new AuthGuard(profileServiceSpy as any, routerSpy as any);

      authGuard.canActivate(editRouteMock);

      expect(routerSpy.navigate).toHaveBeenCalledWith([ 'foo' ]);
    });
  });
});
