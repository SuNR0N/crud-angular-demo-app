import {
  of,
  throwError,
} from 'rxjs';

import {
  MockHttpClient,
  MockMessageService,
} from '../../test/mocks/classes';
import { IProfileDTO } from '../interfaces/dtos/ProfileDTO';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let httpClientMock: MockHttpClient;

  beforeEach(() => {
    httpClientMock = new MockHttpClient();
    authService = new AuthService(httpClientMock as any, new MockMessageService() as any);
  });

  describe('getProfile', () => {
    const profileMock = {} as IProfileDTO;

    it('should be called with the proper URL', () => {
      httpClientMock.get.and.returnValue(of(profileMock));

      authService.getProfile().subscribe();

      expect(httpClientMock.get).toHaveBeenCalledWith('/api/v1/auth/profile');
    });

    it('should return the profile', () => {
      httpClientMock.get.and.returnValue(of(profileMock));

      authService.getProfile().subscribe(
        (profile) => expect(profile).toBe(profileMock),
      );
      expect(httpClientMock.get).toHaveBeenCalledTimes(1);
    });

    it('should log a message', () => {
      httpClientMock.get.and.returnValue(of(profileMock));
      const logSpy = spyOn(authService as any, 'log').and.callThrough();

      authService.getProfile().subscribe();

      expect(logSpy).toHaveBeenCalledWith('fetched profile');
      expect(logSpy).toHaveBeenCalledTimes(1);
    });

    it('should set the error operation', () => {
      httpClientMock.get.and.returnValue(of(profileMock));
      const handleErrorSpy = spyOn(authService as any, 'handleError').and.callThrough();

      authService.getProfile().subscribe();

      expect(handleErrorSpy).toHaveBeenCalledWith('getProfile');
      expect(handleErrorSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle the error', () => {
      httpClientMock.get.and.returnValue(throwError(new Error('Error')));

      authService.getProfile().subscribe(
        null,
        (error) => expect(error).toBe('Error'),
      );
    });
  });

  describe('logOut', () => {
    it('should be called with the proper URL', () => {
      httpClientMock.post.and.returnValue(of('OK'));

      authService.logOut().subscribe();

      expect(httpClientMock.post).toHaveBeenCalledWith('/api/v1/auth/logout', null);
    });

    it('should log a message', () => {
      httpClientMock.post.and.returnValue(of('OK'));
      const logSpy = spyOn(authService as any, 'log').and.callThrough();

      authService.logOut().subscribe();

      expect(logSpy).toHaveBeenCalledWith('logged out');
      expect(logSpy).toHaveBeenCalledTimes(1);
    });

    it('should set the error operation', () => {
      httpClientMock.post.and.returnValue(of('OK'));
      const handleErrorSpy = spyOn(authService as any, 'handleError').and.callThrough();

      authService.logOut().subscribe();

      expect(handleErrorSpy).toHaveBeenCalledWith('logOut');
      expect(handleErrorSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle the error', () => {
      httpClientMock.post.and.returnValue(throwError(new Error('Error')));

      authService.logOut().subscribe(
        null,
        (error) => expect(error).toBe('Error'),
      );
    });
  });
});
