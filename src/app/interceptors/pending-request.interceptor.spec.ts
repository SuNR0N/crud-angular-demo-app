import { HttpRequest } from '@angular/common/http';
import {
  of,
  throwError,
} from 'rxjs';

import { PendingRequestInterceptor } from './pending-request.interceptor';

describe('PendingRequestInterceptor', () => {
  let httpHandlerSpy: { handle: jasmine.Spy };
  let pendingRequestInterceptor: PendingRequestInterceptor;
  let spinnerServiceSpy: {
    addRequest: jasmine.Spy,
    removeRequest: jasmine.Spy,
  };

  beforeEach(() => {
    httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);
    spinnerServiceSpy = jasmine.createSpyObj('SpinnerService', ['addRequest', 'removeRequest']);
    pendingRequestInterceptor = new PendingRequestInterceptor(spinnerServiceSpy as any);
  });

  describe('intercept', () => {
    const requestMock = {} as HttpRequest<any>;

    it('should add the request to the pending requests', () => {
      httpHandlerSpy.handle.and.returnValue(of({}));
      pendingRequestInterceptor.intercept(requestMock, httpHandlerSpy);

      expect(spinnerServiceSpy.addRequest).toHaveBeenCalledWith(requestMock);
    });

    it('should should remove the request from the pending requests if it succeeds', () => {
      httpHandlerSpy.handle.and.returnValue(of({}));
      pendingRequestInterceptor.intercept(requestMock, httpHandlerSpy).subscribe();

      expect(spinnerServiceSpy.removeRequest).toHaveBeenCalledWith(requestMock);
    });

    it('should should remove the request from the pending requests if it fails', () => {
      httpHandlerSpy.handle.and.returnValue(throwError(new Error('Error')));
      pendingRequestInterceptor.intercept(requestMock, httpHandlerSpy).subscribe();

      expect(spinnerServiceSpy.removeRequest).toHaveBeenCalledWith(requestMock);
    });
  });
});
