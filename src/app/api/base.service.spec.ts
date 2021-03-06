import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MockMessageService } from '../../test/mocks/classes/message.service.mock';
import { BaseService } from './base.service';

describe('BaseService', () => {
  let baseService: any;
  let messageServiceMock: MockMessageService;

  beforeEach(() => {
    messageServiceMock = new MockMessageService();
    baseService = new BaseService(messageServiceMock as any);
  });

  describe('handleError', () => {
    const error = new Error('Error');

    it('should have a default operation', () => {
      const logSpy = spyOn(baseService, 'log').and.callThrough();
      const handler = baseService.handleError();
      (<Observable<any>>handler(new Error())).subscribe(
        (_) => {},
        (_) => {},
      );

      expect(logSpy.calls.mostRecent().args[0]).toMatch(/^operation/);
    });

    it('should log the error to the console', () => {
      const errorSpy = spyOn(console, 'error');
      const handler = baseService.handleError();
      (<Observable<any>>handler(error)).subscribe(
        (_) => {},
        (_) => {},
      );

      expect(errorSpy).toHaveBeenCalledWith(error);
    });

    it('should log the error using the logger', () => {
      const logSpy = spyOn(baseService, 'log').and.callThrough();
      const handler = baseService.handleError();
      (<Observable<any>>handler(error)).subscribe(
        (_) => {},
        (_) => {},
      );

      expect(logSpy).toHaveBeenCalledWith('operation failed: Error');
    });

    it('should throw an error with the error property of the HTTP error response', () => {
      const httpError = new HttpErrorResponse({
        error: 'HTTP Error',
      });
      const handler = baseService.handleError();
      (<Observable<any>>handler(httpError)).subscribe(
        (_) => {},
        (message) => expect(message).toBe('HTTP Error'),
      );
    });

    it('should throw an error with the message property of the Error', () => {
      const handler = baseService.handleError();
      (<Observable<any>>handler(error)).subscribe(
        (_) => {},
        (message) => expect(message).toBe('Error'),
      );
    });
  });

  describe('log', () => {
    it('should add the log message using the messageService', () => {
      baseService.log('foo');

      expect(messageServiceMock.add).toHaveBeenCalledWith('BaseService: foo');
    });
  });
});
