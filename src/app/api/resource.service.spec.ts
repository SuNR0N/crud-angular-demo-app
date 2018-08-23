import {
  of,
  throwError,
} from 'rxjs';

import {
  MockHttpClient,
  MockMessageService,
} from '../../test/mocks/classes';
import { IHATEOASLink } from '../interfaces/HATEOASLink';
import { ResourceService } from './resource.service';

describe('ResourceService', () => {
  let resourceService: ResourceService;
  let httpClientMock: MockHttpClient;

  beforeEach(() => {
    httpClientMock = new MockHttpClient();
    resourceService = new ResourceService(httpClientMock as any, new MockMessageService() as any);
  });

  describe('request', () => {
    const linkMock: IHATEOASLink = {
      href: '/foo/bar/1337',
      method: 'DELETE',
    };
    const responseMock = {};

    it('should be called with the proper URL and method', () => {
      httpClientMock.request.and.returnValue(of(responseMock));

      resourceService.request(linkMock).subscribe();

      const [ method, url ] = httpClientMock.request.calls.mostRecent().args;
      expect(method).toBe('DELETE');
      expect(url).toBe('/foo/bar/1337');
    });

    it('should set the content type header if it is called with a data', () => {
      httpClientMock.request.and.returnValue(of(responseMock));

      resourceService.request(linkMock, 'foo').subscribe();

      const options = httpClientMock.request.calls.mostRecent().args[2];
      expect(options.headers.get('Content-Type')).toBe('application/json');
    });

    it('should set the body if it is called with a data', () => {
      httpClientMock.request.and.returnValue(of(responseMock));

      resourceService.request(linkMock, 'foo').subscribe();

      const options = httpClientMock.request.calls.mostRecent().args[2];
      expect(options.body).toBe('foo');
    });

    it('should return the response', () => {
      httpClientMock.request.and.returnValue(of(responseMock));

      resourceService.request(linkMock).subscribe(
        (data) => expect(data).toBe(responseMock),
      );
      expect(httpClientMock.request).toHaveBeenCalledTimes(1);
    });

    it('should log a message', () => {
      httpClientMock.request.and.returnValue(of(responseMock));
      const logSpy = spyOn(resourceService as any, 'log').and.callThrough();

      resourceService.request(linkMock).subscribe();

      expect(logSpy).toHaveBeenCalledWith('request finished');
      expect(logSpy).toHaveBeenCalledTimes(1);
    });

    it('should set the error operation', () => {
      httpClientMock.request.and.returnValue(of(responseMock));
      const handleErrorSpy = spyOn(resourceService as any, 'handleError').and.callThrough();

      resourceService.request(linkMock).subscribe();

      expect(handleErrorSpy).toHaveBeenCalledWith('request');
      expect(handleErrorSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle the error', () => {
      httpClientMock.request.and.returnValue(throwError(new Error('Error')));

      resourceService.request(linkMock).subscribe(
        null,
        (error) => expect(error).toBe('Error'),
      );
    });
  });
});
