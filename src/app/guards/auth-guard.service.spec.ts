import { ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';

import { AuthGuard } from './auth-guard.service';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let profileServiceStub: { getProfile: jasmine.Spy };
  let routerStub: { navigate: jasmine.Spy };

  beforeEach(() => {
    profileServiceStub = jasmine.createSpyObj('ProfileService', ['getProfile']);
    routerStub = jasmine.createSpyObj('Router', ['navigate']);
  });

  describe('canActivate', () => {
    const routeMock = {
      routeConfig: {
        path: 'foo',
      },
    } as ActivatedRouteSnapshot;

    it('should return true if the user is logged in', () => {
      profileServiceStub.getProfile.and.returnValue(of({}));
      authGuard = new AuthGuard(profileServiceStub as any, routerStub as any);

      expect(authGuard.canActivate(routeMock)).toBe(true);
    });

    it('should return false if the user is not logged in', () => {
      profileServiceStub.getProfile.and.returnValue(of(null));
      authGuard = new AuthGuard(profileServiceStub as any, routerStub as any);

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
      profileServiceStub.getProfile.and.returnValue(of(null));
      authGuard = new AuthGuard(profileServiceStub as any, routerStub as any);

      authGuard.canActivate(editRouteMock);

      expect(routerStub.navigate).toHaveBeenCalledWith([ 'foo' ]);
    });
  });
});
