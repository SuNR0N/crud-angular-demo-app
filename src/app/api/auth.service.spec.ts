import {
  of,
  throwError,
} from 'rxjs';

import { IProfileDTO } from '../interfaces/dtos/ProfileDTO';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let httpClientSpy: {
    get: jasmine.Spy,
    post: jasmine.Spy,
  };
  let messageServiceSpy: jasmine.Spy;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);
    authService = new AuthService(httpClientSpy as any, messageServiceSpy as any);
  });

  describe('getProfile', () => {
    const profileMock = {} as IProfileDTO;

    it('should be called with the proper URL', () => {
      httpClientSpy.get.and.returnValue(of(profileMock));

      authService.getProfile().subscribe();

      expect(httpClientSpy.get).toHaveBeenCalledWith('/api/v1/auth/profile');
    });

    it('should return the profile', () => {
      httpClientSpy.get.and.returnValue(of(profileMock));

      authService.getProfile().subscribe(
        (profile) => expect(profile).toBe(profileMock),
      );
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    });

    it('should log a message', () => {
      httpClientSpy.get.and.returnValue(of(profileMock));
      const logSpy = spyOn(authService as any, 'log').and.callThrough();

      authService.getProfile().subscribe();

      expect(logSpy).toHaveBeenCalledWith('fetched profile');
      expect(logSpy).toHaveBeenCalledTimes(1);
    });

    it('should set the error operation', () => {
      httpClientSpy.get.and.returnValue(of(profileMock));
      const handleErrorSpy = spyOn(authService as any, 'handleError').and.callThrough();

      authService.getProfile().subscribe();

      expect(handleErrorSpy).toHaveBeenCalledWith('getProfile');
      expect(handleErrorSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle the error', () => {
      httpClientSpy.get.and.returnValue(throwError(new Error('Error')));

      authService.getProfile().subscribe(
        null,
        (error) => expect(error).toBe('Error'),
      );
    });
  });

  describe('logOut', () => {
    it('should be called with the proper URL', () => {
      httpClientSpy.post.and.returnValue(of('OK'));

      authService.logOut().subscribe();

      expect(httpClientSpy.post).toHaveBeenCalledWith('/api/v1/auth/logout', null);
    });

    it('should log a message', () => {
      httpClientSpy.post.and.returnValue(of('OK'));
      const logSpy = spyOn(authService as any, 'log').and.callThrough();

      authService.logOut().subscribe();

      expect(logSpy).toHaveBeenCalledWith('logged out');
      expect(logSpy).toHaveBeenCalledTimes(1);
    });

    it('should set the error operation', () => {
      httpClientSpy.post.and.returnValue(of('OK'));
      const handleErrorSpy = spyOn(authService as any, 'handleError').and.callThrough();

      authService.logOut().subscribe();

      expect(handleErrorSpy).toHaveBeenCalledWith('logOut');
      expect(handleErrorSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle the error', () => {
      httpClientSpy.post.and.returnValue(throwError(new Error('Error')));

      authService.logOut().subscribe(
        null,
        (error) => expect(error).toBe('Error'),
      );
    });
  });
});
