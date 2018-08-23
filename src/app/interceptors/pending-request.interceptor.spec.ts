import { HttpRequest } from '@angular/common/http';
import {
  of,
  throwError,
} from 'rxjs';

import { PendingRequestInterceptor } from './pending-request.interceptor';

describe('PendingRequestInterceptor', () => {
  let httpHandlerStub: { handle: jasmine.Spy };
  let pendingRequestInterceptor: PendingRequestInterceptor;
  let spinnerServiceStub: {
    addRequest: jasmine.Spy,
    removeRequest: jasmine.Spy,
  };

  beforeEach(() => {
    httpHandlerStub = jasmine.createSpyObj('HttpHandler', ['handle']);
    spinnerServiceStub = jasmine.createSpyObj('SpinnerService', ['addRequest', 'removeRequest']);
    pendingRequestInterceptor = new PendingRequestInterceptor(spinnerServiceStub as any);
  });

  describe('intercept', () => {
    const requestMock = {} as HttpRequest<any>;

    it('should add the request to the pending requests', () => {
      httpHandlerStub.handle.and.returnValue(of({}));
      pendingRequestInterceptor.intercept(requestMock, httpHandlerStub);

      expect(spinnerServiceStub.addRequest).toHaveBeenCalledWith(requestMock);
    });

    it('should should remove the request from the pending requests if it succeeds', () => {
      httpHandlerStub.handle.and.returnValue(of({}));
      pendingRequestInterceptor.intercept(requestMock, httpHandlerStub).subscribe();

      expect(spinnerServiceStub.removeRequest).toHaveBeenCalledWith(requestMock);
    });

    it('should should remove the request from the pending requests if it fails', () => {
      httpHandlerStub.handle.and.returnValue(throwError(new Error('Error')));
      pendingRequestInterceptor.intercept(requestMock, httpHandlerStub).subscribe(
        (_) => {},
        (_) => {},
      );

      expect(spinnerServiceStub.removeRequest).toHaveBeenCalledWith(requestMock);
    });
  });
});
