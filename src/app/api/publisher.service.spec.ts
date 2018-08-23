import {
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import {
  of,
  throwError,
} from 'rxjs';

import {
  MockHttpClient,
  MockMessageService,
} from '../../test/mocks/classes';
import {
  INewPublisherDTO,
  IPublisherDTO,
} from '../interfaces/dtos';
import { PublisherService } from './publisher.service';

describe('PublisherService', () => {
  let publisherService: PublisherService;
  let httpClientMock: MockHttpClient;

  beforeEach(() => {
    httpClientMock = new MockHttpClient();
    publisherService = new PublisherService(httpClientMock as any, new MockMessageService() as any);
  });

  describe('getPublishers', () => {
    const publishersMock: IPublisherDTO[] = [];

    it('should be called with the proper URL', () => {
      httpClientMock.get.and.returnValue(of(publishersMock));

      publisherService.getPublishers().subscribe();

      expect(httpClientMock.get).toHaveBeenCalledWith('/api/v1/publishers', jasmine.anything());
    });

    it('should call the URL with a query param if it is provided', () => {
      httpClientMock.get.and.returnValue(of(publishersMock));

      publisherService.getPublishers('foo').subscribe();

      const options = httpClientMock.get.calls.mostRecent().args[1];
      expect(options.params.get('q')).toBe('foo');
    });

    it('should return the publishers', () => {
      httpClientMock.get.and.returnValue(of(publishersMock));

      publisherService.getPublishers().subscribe(
        (publishers) => expect(publishers).toBe(publishersMock),
      );
      expect(httpClientMock.get).toHaveBeenCalledTimes(1);
    });

    it('should log a message', () => {
      httpClientMock.get.and.returnValue(of(publishersMock));
      const logSpy = spyOn(publisherService as any, 'log').and.callThrough();

      publisherService.getPublishers().subscribe();

      expect(logSpy).toHaveBeenCalledWith('fetched publishers');
      expect(logSpy).toHaveBeenCalledTimes(1);
    });

    it('should set the error operation', () => {
      httpClientMock.get.and.returnValue(of(publishersMock));
      const handleErrorSpy = spyOn(publisherService as any, 'handleError').and.callThrough();

      publisherService.getPublishers().subscribe();

      expect(handleErrorSpy).toHaveBeenCalledWith('getPublishers');
      expect(handleErrorSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle the error', () => {
      httpClientMock.get.and.returnValue(throwError(new Error('Error')));

      publisherService.getPublishers().subscribe(
        null,
        (error) => expect(error).toBe('Error'),
      );
    });
  });

  describe('getPublisher', () => {
    const publisherMock = {} as IPublisherDTO;

    it('should be called with the proper URL', () => {
      httpClientMock.get.and.returnValue(of(publisherMock));

      publisherService.getPublisher(1).subscribe();

      expect(httpClientMock.get).toHaveBeenCalledWith('/api/v1/publishers/1');
    });

    it('should return the publisher', () => {
      httpClientMock.get.and.returnValue(of(publisherMock));

      publisherService.getPublisher(1).subscribe(
        (publisher) => expect(publisher).toBe(publisherMock),
      );
      expect(httpClientMock.get).toHaveBeenCalledTimes(1);
    });

    it('should log a message', () => {
      httpClientMock.get.and.returnValue(of(publisherMock));
      const logSpy = spyOn(publisherService as any, 'log').and.callThrough();

      publisherService.getPublisher(1).subscribe();

      expect(logSpy).toHaveBeenCalledWith('fetched publisher id=1');
      expect(logSpy).toHaveBeenCalledTimes(1);
    });

    it('should set the error operation', () => {
      httpClientMock.get.and.returnValue(of(publisherMock));
      const handleErrorSpy = spyOn(publisherService as any, 'handleError').and.callThrough();

      publisherService.getPublisher(1).subscribe();

      expect(handleErrorSpy).toHaveBeenCalledWith('getPublisher id=1');
      expect(handleErrorSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle the error', () => {
      httpClientMock.get.and.returnValue(throwError(new Error('Error')));

      publisherService.getPublisher(1).subscribe(
        null,
        (error) => expect(error).toBe('Error'),
      );
    });
  });

  describe('createPublisher', () => {
    const newPublisherMock = {} as INewPublisherDTO;
    const httpResponseMock = {
      headers: new HttpHeaders({ Location: '/api/v1/publishers/3' }),
    } as HttpResponse<any>;

    it('should be called with the proper URL', () => {
      httpClientMock.post.and.returnValue(of(httpResponseMock));

      publisherService.createPublisher(newPublisherMock).subscribe();

      expect(httpClientMock.post).toHaveBeenCalledWith('/api/v1/publishers', newPublisherMock, jasmine.anything());
    });

    it('should return the id of the created entity', () => {
      httpClientMock.post.and.returnValue(of(httpResponseMock));

      publisherService.createPublisher(newPublisherMock).subscribe(
        (id) => expect(id).toBe(3),
      );
    });

    it('should log a message', () => {
      httpClientMock.post.and.returnValue(of(httpResponseMock));
      const logSpy = spyOn(publisherService as any, 'log').and.callThrough();

      publisherService.createPublisher(newPublisherMock).subscribe();

      expect(logSpy).toHaveBeenCalledWith('created publisher={}');
      expect(logSpy).toHaveBeenCalledTimes(1);
    });

    it('should set the error operation', () => {
      httpClientMock.post.and.returnValue(of(httpResponseMock));
      const handleErrorSpy = spyOn(publisherService as any, 'handleError').and.callThrough();

      publisherService.createPublisher(newPublisherMock).subscribe();

      expect(handleErrorSpy).toHaveBeenCalledWith('createPublisher publisher={}');
      expect(handleErrorSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle the error', () => {
      httpClientMock.post.and.returnValue(throwError(new Error('Error')));

      publisherService.createPublisher(newPublisherMock).subscribe(
        null,
        (error) => expect(error).toBe('Error'),
      );
    });

    it('should throw an error if the location header does not exist', () => {
      const httpResponseMockWithoutHeaders = {
        headers: new HttpHeaders(),
      } as HttpResponse<any>;
      httpClientMock.post.and.returnValue(of(httpResponseMockWithoutHeaders));

      publisherService.createPublisher(newPublisherMock).subscribe(
        null,
        (error) => expect(error).toBe('Invalid location header'),
      );
    });

    it('should throw an error if the location header is invalid', () => {
      const httpResponseMockWithInvalidHeaders = {
        headers: new HttpHeaders({
          Location: '/api/v1/publishers/foo',
        }),
      } as HttpResponse<any>;
      httpClientMock.post.and.returnValue(of(httpResponseMockWithInvalidHeaders));

      publisherService.createPublisher(newPublisherMock).subscribe(
        null,
        (error) => expect(error).toBe('Invalid location header'),
      );
    });
  });
});
