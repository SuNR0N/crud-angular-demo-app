import {
  of,
  throwError,
} from 'rxjs';

import { IHATEOASLink } from '../interfaces/HATEOASLink';
import { ResourceService } from './resource.service';

describe('ResourceService', () => {
  let resourceService: ResourceService;
  let httpClientSpy: { request: jasmine.Spy };
  let messageServiceSpy: jasmine.Spy;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['request']);
    messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);
    resourceService = new ResourceService(httpClientSpy as any, messageServiceSpy as any);
  });

  describe('request', () => {
    const linkMock: IHATEOASLink = {
      href: '/foo/bar/1337',
      method: 'DELETE',
    };
    const responseMock = {};

    it('should be called with the proper URL and method', () => {
      httpClientSpy.request.and.returnValue(of(responseMock));

      resourceService.request(linkMock).subscribe();

      const [ method, url ] = httpClientSpy.request.calls.mostRecent().args;
      expect(method).toBe('DELETE');
      expect(url).toBe('/foo/bar/1337');
    });

    it('should set the content type header if it is called with a data', () => {
      httpClientSpy.request.and.returnValue(of(responseMock));

      resourceService.request(linkMock, 'foo').subscribe();

      const options = httpClientSpy.request.calls.mostRecent().args[2];
      expect(options.headers.get('Content-Type')).toBe('application/json');
    });

    it('should set the body if it is called with a data', () => {
      httpClientSpy.request.and.returnValue(of(responseMock));

      resourceService.request(linkMock, 'foo').subscribe();

      const options = httpClientSpy.request.calls.mostRecent().args[2];
      expect(options.body).toBe('foo');
    });

    it('should return the response', () => {
      httpClientSpy.request.and.returnValue(of(responseMock));

      resourceService.request(linkMock).subscribe(
        (data) => expect(data).toBe(responseMock),
      );
      expect(httpClientSpy.request).toHaveBeenCalledTimes(1);
    });

    it('should log a message', () => {
      httpClientSpy.request.and.returnValue(of(responseMock));
      const logSpy = spyOn(resourceService as any, 'log').and.callThrough();

      resourceService.request(linkMock).subscribe();

      expect(logSpy).toHaveBeenCalledWith('request finished');
      expect(logSpy).toHaveBeenCalledTimes(1);
    });

    it('should set the error operation', () => {
      httpClientSpy.request.and.returnValue(of(responseMock));
      const handleErrorSpy = spyOn(resourceService as any, 'handleError').and.callThrough();

      resourceService.request(linkMock).subscribe();

      expect(handleErrorSpy).toHaveBeenCalledWith('request');
      expect(handleErrorSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle the error', () => {
      httpClientSpy.request.and.returnValue(throwError(new Error('Error')));

      resourceService.request(linkMock).subscribe(
        null,
        (error) => expect(error).toBe('Error'),
      );
    });
  });
});
