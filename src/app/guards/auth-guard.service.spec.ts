import { ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';

import {
  MockProfileService,
  MockRouter,
} from '../../test/mocks/classes';
import { AuthGuard } from './auth-guard.service';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let profileServiceMock: MockProfileService;
  let routerMock: MockRouter;

  beforeEach(() => {
    profileServiceMock = new MockProfileService();
    routerMock = new MockRouter();
  });

  describe('canActivate', () => {
    const routeMock = {
      routeConfig: {
        path: 'foo',
      },
    } as ActivatedRouteSnapshot;

    it('should return true if the user is logged in', () => {
      profileServiceMock.getProfile.and.returnValue(of({}));
      authGuard = new AuthGuard(profileServiceMock as any, routerMock as any);

      expect(authGuard.canActivate(routeMock)).toBe(true);
    });

    it('should return false if the user is not logged in', () => {
      profileServiceMock.getProfile.and.returnValue(of(null));
      authGuard = new AuthGuard(profileServiceMock as any, routerMock as any);

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
      profileServiceMock.getProfile.and.returnValue(of(null));
      authGuard = new AuthGuard(profileServiceMock as any, routerMock as any);

      authGuard.canActivate(editRouteMock);

      expect(routerMock.navigate).toHaveBeenCalledWith([ 'foo' ]);
    });
  });
});
