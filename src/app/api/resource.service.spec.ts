import {
  of,
  throwError,
} from 'rxjs';

import { IHATEOASLink } from '../interfaces/HATEOASLink';
import { ResourceService } from './resource.service';

describe('ResourceService', () => {
  let resourceService: ResourceService;
  let httpClientStub: { request: jasmine.Spy };
  let messageServiceStub: {
    add: jasmine.Spy,
  };

  beforeEach(() => {
    httpClientStub = jasmine.createSpyObj('HttpClient', ['request']);
    messageServiceStub = jasmine.createSpyObj('MessageService', ['add']);
    resourceService = new ResourceService(httpClientStub as any, messageServiceStub as any);
  });

  describe('request', () => {
    const linkMock: IHATEOASLink = {
      href: '/foo/bar/1337',
      method: 'DELETE',
    };
    const responseMock = {};

    it('should be called with the proper URL and method', () => {
      httpClientStub.request.and.returnValue(of(responseMock));

      resourceService.request(linkMock).subscribe();

      const [ method, url ] = httpClientStub.request.calls.mostRecent().args;
      expect(method).toBe('DELETE');
      expect(url).toBe('/foo/bar/1337');
    });

    it('should set the content type header if it is called with a data', () => {
      httpClientStub.request.and.returnValue(of(responseMock));

      resourceService.request(linkMock, 'foo').subscribe();

      const options = httpClientStub.request.calls.mostRecent().args[2];
      expect(options.headers.get('Content-Type')).toBe('application/json');
    });

    it('should set the body if it is called with a data', () => {
      httpClientStub.request.and.returnValue(of(responseMock));

      resourceService.request(linkMock, 'foo').subscribe();

      const options = httpClientStub.request.calls.mostRecent().args[2];
      expect(options.body).toBe('foo');
    });

    it('should return the response', () => {
      httpClientStub.request.and.returnValue(of(responseMock));

      resourceService.request(linkMock).subscribe(
        (data) => expect(data).toBe(responseMock),
      );
      expect(httpClientStub.request).toHaveBeenCalledTimes(1);
    });

    it('should log a message', () => {
      httpClientStub.request.and.returnValue(of(responseMock));
      const logSpy = spyOn(resourceService as any, 'log').and.callThrough();

      resourceService.request(linkMock).subscribe();

      expect(logSpy).toHaveBeenCalledWith('request finished');
      expect(logSpy).toHaveBeenCalledTimes(1);
    });

    it('should set the error operation', () => {
      httpClientStub.request.and.returnValue(of(responseMock));
      const handleErrorSpy = spyOn(resourceService as any, 'handleError').and.callThrough();

      resourceService.request(linkMock).subscribe();

      expect(handleErrorSpy).toHaveBeenCalledWith('request');
      expect(handleErrorSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle the error', () => {
      httpClientStub.request.and.returnValue(throwError(new Error('Error')));

      resourceService.request(linkMock).subscribe(
        null,
        (error) => expect(error).toBe('Error'),
      );
    });
  });
});
