import { HttpRequest } from '@angular/common/http';

import { SpinnerService } from './spinner.service';

describe('ProfileService', () => {
  const requestMock = {} as HttpRequest<any>;
  let spinnerService: SpinnerService;

  beforeEach(() => {
    spinnerService = new SpinnerService();
  });

  describe('addRequest', () => {
    it('should add the request to the pending requests', () => {
      spinnerService.addRequest(requestMock);

      expect((spinnerService as any).pendingRequests).toContain(requestMock);
      expect((spinnerService as any).pendingRequests.length).toBe(1);
    });
  });

  describe('removeRequest', () => {
    beforeEach(() => {
      spinnerService.addRequest(requestMock);
    });

    it('should remove the request from the pending requests if exists', () => {
      spinnerService.removeRequest(requestMock);

      expect((spinnerService as any).pendingRequests).not.toContain(requestMock);
      expect((spinnerService as any).pendingRequests.length).toBe(0);
    });

    it('should not remove any requests if the provided request does not exist', () => {
      const otherRequestMock = {} as HttpRequest<any>;
      spinnerService.removeRequest(otherRequestMock);

      expect((spinnerService as any).pendingRequests).toContain(requestMock);
      expect((spinnerService as any).pendingRequests.length).toBe(1);
    });
  });

  describe('matches', () => {
    beforeEach(() => {
      const requestsMock: HttpRequest<any>[] = [
        {
          method: 'GET',
          url: '/foo/bar/1337',
        } as HttpRequest<any>,
        {
          method: 'POST',
          url: '/foo/bar',
        } as HttpRequest<any>,
        {
          method: 'GET',
          url: '/foo/bar/1337/foobar/111',
        } as HttpRequest<any>,
      ];
      requestsMock.forEach((request) => spinnerService.addRequest(request));
    });

    it('should return true if at least a single pending request matches the provided pattern', () => {
      const value = spinnerService.matches(['POST', /^\/foo/]);

      expect(value).toBe(true);
    });

    it('should return true if multiple pending requests match the provided pattern', () => {
      const value = spinnerService.matches(['GET', /^\/foo\/bar\/1337/]);

      expect(value).toBe(true);
    });

    it('should return false if none of the pending requests match the provided pattern', () => {
      const value = spinnerService.matches(['DELETE', /^\/foo\/bar\/1337/]);

      expect(value).toBe(false);
    });
  });
});
