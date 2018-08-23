import {
  of,
  throwError,
} from 'rxjs';

import { IProfileDTO } from '../interfaces/dtos/ProfileDTO';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let httpClientStub: {
    get: jasmine.Spy,
    post: jasmine.Spy,
  };
  let messageServiceStub: {
    add: jasmine.Spy;
  };

  beforeEach(() => {
    httpClientStub = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    messageServiceStub = jasmine.createSpyObj('MessageService', ['add']);
    authService = new AuthService(httpClientStub as any, messageServiceStub as any);
  });

  describe('getProfile', () => {
    const profileMock = {} as IProfileDTO;

    it('should be called with the proper URL', () => {
      httpClientStub.get.and.returnValue(of(profileMock));

      authService.getProfile().subscribe();

      expect(httpClientStub.get).toHaveBeenCalledWith('/api/v1/auth/profile');
    });

    it('should return the profile', () => {
      httpClientStub.get.and.returnValue(of(profileMock));

      authService.getProfile().subscribe(
        (profile) => expect(profile).toBe(profileMock),
      );
      expect(httpClientStub.get).toHaveBeenCalledTimes(1);
    });

    it('should log a message', () => {
      httpClientStub.get.and.returnValue(of(profileMock));
      const logSpy = spyOn(authService as any, 'log').and.callThrough();

      authService.getProfile().subscribe();

      expect(logSpy).toHaveBeenCalledWith('fetched profile');
      expect(logSpy).toHaveBeenCalledTimes(1);
    });

    it('should set the error operation', () => {
      httpClientStub.get.and.returnValue(of(profileMock));
      const handleErrorSpy = spyOn(authService as any, 'handleError').and.callThrough();

      authService.getProfile().subscribe();

      expect(handleErrorSpy).toHaveBeenCalledWith('getProfile');
      expect(handleErrorSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle the error', () => {
      httpClientStub.get.and.returnValue(throwError(new Error('Error')));

      authService.getProfile().subscribe(
        null,
        (error) => expect(error).toBe('Error'),
      );
    });
  });

  describe('logOut', () => {
    it('should be called with the proper URL', () => {
      httpClientStub.post.and.returnValue(of('OK'));

      authService.logOut().subscribe();

      expect(httpClientStub.post).toHaveBeenCalledWith('/api/v1/auth/logout', null);
    });

    it('should log a message', () => {
      httpClientStub.post.and.returnValue(of('OK'));
      const logSpy = spyOn(authService as any, 'log').and.callThrough();

      authService.logOut().subscribe();

      expect(logSpy).toHaveBeenCalledWith('logged out');
      expect(logSpy).toHaveBeenCalledTimes(1);
    });

    it('should set the error operation', () => {
      httpClientStub.post.and.returnValue(of('OK'));
      const handleErrorSpy = spyOn(authService as any, 'handleError').and.callThrough();

      authService.logOut().subscribe();

      expect(handleErrorSpy).toHaveBeenCalledWith('logOut');
      expect(handleErrorSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle the error', () => {
      httpClientStub.post.and.returnValue(throwError(new Error('Error')));

      authService.logOut().subscribe(
        null,
        (error) => expect(error).toBe('Error'),
      );
    });
  });
});
