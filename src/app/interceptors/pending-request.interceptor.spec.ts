import { HttpRequest } from '@angular/common/http';
import {
  of,
  throwError,
} from 'rxjs';

import {
  MockHttpHandler,
  MockSpinnerService,
} from '../../test/mocks/classes';
import { PendingRequestInterceptor } from './pending-request.interceptor';

describe('PendingRequestInterceptor', () => {
  let httpHandlerMock: MockHttpHandler;
  let pendingRequestInterceptor: PendingRequestInterceptor;
  let spinnerServiceMock: MockSpinnerService;

  beforeEach(() => {
    httpHandlerMock = new MockHttpHandler();
    spinnerServiceMock = new MockSpinnerService();
    pendingRequestInterceptor = new PendingRequestInterceptor(spinnerServiceMock as any);
  });

  describe('intercept', () => {
    const requestMock = {} as HttpRequest<any>;

    it('should add the request to the pending requests', () => {
      httpHandlerMock.handle.and.returnValue(of({}));
      pendingRequestInterceptor.intercept(requestMock, httpHandlerMock);

      expect(spinnerServiceMock.addRequest).toHaveBeenCalledWith(requestMock);
    });

    it('should should remove the request from the pending requests if it succeeds', () => {
      httpHandlerMock.handle.and.returnValue(of({}));
      pendingRequestInterceptor.intercept(requestMock, httpHandlerMock).subscribe();

      expect(spinnerServiceMock.removeRequest).toHaveBeenCalledWith(requestMock);
    });

    it('should should remove the request from the pending requests if it fails', () => {
      httpHandlerMock.handle.and.returnValue(throwError(new Error('Error')));
      pendingRequestInterceptor.intercept(requestMock, httpHandlerMock).subscribe(
        (_) => {},
        (_) => {},
      );

      expect(spinnerServiceMock.removeRequest).toHaveBeenCalledWith(requestMock);
    });
  });
});
