import {
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import {
  of,
  throwError,
} from 'rxjs';

import {
  IAuthorDTO,
  INewAuthorDTO,
} from '../interfaces/dtos';
import { AuthorService } from './author.service';

describe('AuthorService', () => {
  let authorService: AuthorService;
  let httpClientStub: {
    get: jasmine.Spy,
    post: jasmine.Spy,
  };
  let messageServiceStub: {
    add: jasmine.Spy,
  };

  beforeEach(() => {
    httpClientStub = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    messageServiceStub = jasmine.createSpyObj('MessageService', ['add']);
    authorService = new AuthorService(httpClientStub as any, messageServiceStub as any);
  });

  describe('getAuthors', () => {
    const authorsMock: IAuthorDTO[] = [];

    it('should be called with the proper URL', () => {
      httpClientStub.get.and.returnValue(of(authorsMock));

      authorService.getAuthors().subscribe();

      expect(httpClientStub.get).toHaveBeenCalledWith('/api/v1/authors', jasmine.anything());
    });

    it('should call the URL with a query param if it is provided', () => {
      httpClientStub.get.and.returnValue(of(authorsMock));

      authorService.getAuthors('foo').subscribe();

      const options = httpClientStub.get.calls.mostRecent().args[1];
      expect(options.params.get('q')).toBe('foo');
    });

    it('should return the authors', () => {
      httpClientStub.get.and.returnValue(of(authorsMock));

      authorService.getAuthors().subscribe(
        (authors) => expect(authors).toBe(authorsMock),
      );
      expect(httpClientStub.get).toHaveBeenCalledTimes(1);
    });

    it('should log a message', () => {
      httpClientStub.get.and.returnValue(of(authorsMock));
      const logSpy = spyOn(authorService as any, 'log').and.callThrough();

      authorService.getAuthors().subscribe();

      expect(logSpy).toHaveBeenCalledWith('fetched authors');
      expect(logSpy).toHaveBeenCalledTimes(1);
    });

    it('should set the error operation', () => {
      httpClientStub.get.and.returnValue(of(authorsMock));
      const handleErrorSpy = spyOn(authorService as any, 'handleError').and.callThrough();

      authorService.getAuthors().subscribe();

      expect(handleErrorSpy).toHaveBeenCalledWith('getAuthors');
      expect(handleErrorSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle the error', () => {
      httpClientStub.get.and.returnValue(throwError(new Error('Error')));

      authorService.getAuthors().subscribe(
        null,
        (error) => expect(error).toBe('Error'),
      );
    });
  });

  describe('getAuthor', () => {
    const authorMock = {} as IAuthorDTO;

    it('should be called with the proper URL', () => {
      httpClientStub.get.and.returnValue(of(authorMock));

      authorService.getAuthor(1).subscribe();

      expect(httpClientStub.get).toHaveBeenCalledWith('/api/v1/authors/1');
    });

    it('should return the author', () => {
      httpClientStub.get.and.returnValue(of(authorMock));

      authorService.getAuthor(1).subscribe(
        (author) => expect(author).toBe(authorMock),
      );
      expect(httpClientStub.get).toHaveBeenCalledTimes(1);
    });

    it('should log a message', () => {
      httpClientStub.get.and.returnValue(of(authorMock));
      const logSpy = spyOn(authorService as any, 'log').and.callThrough();

      authorService.getAuthor(1).subscribe();

      expect(logSpy).toHaveBeenCalledWith('fetched author id=1');
      expect(logSpy).toHaveBeenCalledTimes(1);
    });

    it('should set the error operation', () => {
      httpClientStub.get.and.returnValue(of(authorMock));
      const handleErrorSpy = spyOn(authorService as any, 'handleError').and.callThrough();

      authorService.getAuthor(1).subscribe();

      expect(handleErrorSpy).toHaveBeenCalledWith('getAuthor id=1');
      expect(handleErrorSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle the error', () => {
      httpClientStub.get.and.returnValue(throwError(new Error('Error')));

      authorService.getAuthor(1).subscribe(
        null,
        (error) => expect(error).toBe('Error'),
      );
    });
  });

  describe('createAuthor', () => {
    const newAuthorMock = {} as INewAuthorDTO;
    const httpResponseMock = {
      headers: new HttpHeaders({ Location: '/api/v1/authors/3' }),
    } as HttpResponse<any>;

    it('should be called with the proper URL', () => {
      httpClientStub.post.and.returnValue(of(httpResponseMock));

      authorService.createAuthor(newAuthorMock).subscribe();

      expect(httpClientStub.post).toHaveBeenCalledWith('/api/v1/authors', newAuthorMock, jasmine.anything());
    });

    it('should return the id of the created entity', () => {
      httpClientStub.post.and.returnValue(of(httpResponseMock));

      authorService.createAuthor(newAuthorMock).subscribe(
        (id) => expect(id).toBe(3),
      );
    });

    it('should log a message', () => {
      httpClientStub.post.and.returnValue(of(httpResponseMock));
      const logSpy = spyOn(authorService as any, 'log').and.callThrough();

      authorService.createAuthor(newAuthorMock).subscribe();

      expect(logSpy).toHaveBeenCalledWith('created author={}');
      expect(logSpy).toHaveBeenCalledTimes(1);
    });

    it('should set the error operation', () => {
      httpClientStub.post.and.returnValue(of(httpResponseMock));
      const handleErrorSpy = spyOn(authorService as any, 'handleError').and.callThrough();

      authorService.createAuthor(newAuthorMock).subscribe();

      expect(handleErrorSpy).toHaveBeenCalledWith('createAuthor author={}');
      expect(handleErrorSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle the error', () => {
      httpClientStub.post.and.returnValue(throwError(new Error('Error')));

      authorService.createAuthor(newAuthorMock).subscribe(
        null,
        (error) => expect(error).toBe('Error'),
      );
    });

    it('should throw an error if the location header does not exist', () => {
      const httpResponseMockWithoutHeaders = {
        headers: new HttpHeaders(),
      } as HttpResponse<any>;
      httpClientStub.post.and.returnValue(of(httpResponseMockWithoutHeaders));

      authorService.createAuthor(newAuthorMock).subscribe(
        null,
        (error) => expect(error).toBe('Invalid location header'),
      );
    });

    it('should throw an error if the location header is invalid', () => {
      const httpResponseMockWithInvalidHeaders = {
        headers: new HttpHeaders({
          Location: '/api/v1/authors/foo',
        }),
      } as HttpResponse<any>;
      httpClientStub.post.and.returnValue(of(httpResponseMockWithInvalidHeaders));

      authorService.createAuthor(newAuthorMock).subscribe(
        null,
        (error) => expect(error).toBe('Invalid location header'),
      );
    });
  });
});
