import {
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import {
  of,
  throwError,
} from 'rxjs';

import {
  IBookDTO,
  INewBookDTO,
  IPageableCollectionDTO,
} from '../interfaces/dtos';
import { BookService } from './book.service';

describe('BookService', () => {
  let bookService: BookService;
  let httpClientSpy: {
    get: jasmine.Spy,
    post: jasmine.Spy,
  };
  let messageServiceSpy: jasmine.Spy;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);
    bookService = new BookService(httpClientSpy as any, messageServiceSpy as any);
  });

  describe('getBooks', () => {
    const collectionMock: IPageableCollectionDTO<IBookDTO> = {
      content: [],
      currentPage: 1,
      totalItems: 1,
      totalPages: 1,
    };

    it('should be called with the proper URL', () => {
      httpClientSpy.get.and.returnValue(of(collectionMock));

      bookService.getBooks().subscribe();

      expect(httpClientSpy.get).toHaveBeenCalledWith('/api/v1/books', jasmine.anything());
    });

    it('should call the URL with a query param if it is provided', () => {
      httpClientSpy.get.and.returnValue(of(collectionMock));

      bookService.getBooks('foo').subscribe();

      const options = httpClientSpy.get.calls.mostRecent().args[1];
      expect(options.params.get('q')).toBe('foo');
    });

    it('should return the collection', () => {
      httpClientSpy.get.and.returnValue(of(collectionMock));

      bookService.getBooks().subscribe(
        (collection) => expect(collection).toBe(collectionMock),
      );
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    });

    it('should log a message', () => {
      httpClientSpy.get.and.returnValue(of(collectionMock));
      const logSpy = spyOn(bookService as any, 'log').and.callThrough();

      bookService.getBooks().subscribe();

      expect(logSpy).toHaveBeenCalledWith('fetched books');
      expect(logSpy).toHaveBeenCalledTimes(1);
    });

    it('should set the error operation', () => {
      httpClientSpy.get.and.returnValue(of(collectionMock));
      const handleErrorSpy = spyOn(bookService as any, 'handleError').and.callThrough();

      bookService.getBooks().subscribe();

      expect(handleErrorSpy).toHaveBeenCalledWith('getBooks');
      expect(handleErrorSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle the error', () => {
      httpClientSpy.get.and.returnValue(throwError(new Error('Error')));

      bookService.getBooks().subscribe(
        null,
        (error) => expect(error).toBe('Error'),
      );
    });
  });

  describe('getBook', () => {
    const bookMock = {} as IBookDTO;

    it('should be called with the proper URL', () => {
      httpClientSpy.get.and.returnValue(of(bookMock));

      bookService.getBook(1).subscribe();

      expect(httpClientSpy.get).toHaveBeenCalledWith('/api/v1/books/1');
    });

    it('should return the book', () => {
      httpClientSpy.get.and.returnValue(of(bookMock));

      bookService.getBook(1).subscribe(
        (book) => expect(book).toBe(bookMock),
      );
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    });

    it('should log a message', () => {
      httpClientSpy.get.and.returnValue(of(bookMock));
      const logSpy = spyOn(bookService as any, 'log').and.callThrough();

      bookService.getBook(1).subscribe();

      expect(logSpy).toHaveBeenCalledWith('fetched book id=1');
      expect(logSpy).toHaveBeenCalledTimes(1);
    });

    it('should set the error operation', () => {
      httpClientSpy.get.and.returnValue(of(bookMock));
      const handleErrorSpy = spyOn(bookService as any, 'handleError').and.callThrough();

      bookService.getBook(1).subscribe();

      expect(handleErrorSpy).toHaveBeenCalledWith('getBook id=1');
      expect(handleErrorSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle the error', () => {
      httpClientSpy.get.and.returnValue(throwError(new Error('Error')));

      bookService.getBook(1).subscribe(
        null,
        (error) => expect(error).toBe('Error'),
      );
    });
  });

  describe('createBook', () => {
    const newBookMock = {} as INewBookDTO;
    const httpResponseMock = {
      headers: new HttpHeaders({ Location: '/api/v1/books/3' }),
    } as HttpResponse<any>;

    it('should be called with the proper URL', () => {
      httpClientSpy.post.and.returnValue(of(httpResponseMock));

      bookService.createBook(newBookMock).subscribe();

      expect(httpClientSpy.post).toHaveBeenCalledWith('/api/v1/books', newBookMock, jasmine.anything());
    });

    it('should return the id of the created entity', () => {
      httpClientSpy.post.and.returnValue(of(httpResponseMock));

      bookService.createBook(newBookMock).subscribe(
        (id) => expect(id).toBe(3),
      );
    });

    it('should log a message', () => {
      httpClientSpy.post.and.returnValue(of(httpResponseMock));
      const logSpy = spyOn(bookService as any, 'log').and.callThrough();

      bookService.createBook(newBookMock).subscribe();

      expect(logSpy).toHaveBeenCalledWith('created book={}');
      expect(logSpy).toHaveBeenCalledTimes(1);
    });

    it('should set the error operation', () => {
      httpClientSpy.post.and.returnValue(of(httpResponseMock));
      const handleErrorSpy = spyOn(bookService as any, 'handleError').and.callThrough();

      bookService.createBook(newBookMock).subscribe();

      expect(handleErrorSpy).toHaveBeenCalledWith('createBook book={}');
      expect(handleErrorSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle the error', () => {
      httpClientSpy.post.and.returnValue(throwError(new Error('Error')));

      bookService.createBook(newBookMock).subscribe(
        null,
        (error) => expect(error).toBe('Error'),
      );
    });

    it('should throw an error if the location header does not exist', () => {
      const httpResponseMockWithoutHeaders = {
        headers: new HttpHeaders(),
      } as HttpResponse<any>;
      httpClientSpy.post.and.returnValue(of(httpResponseMockWithoutHeaders));

      bookService.createBook(newBookMock).subscribe(
        null,
        (error) => expect(error).toBe('Invalid location header'),
      );
    });

    it('should throw an error if the location header is invalid', () => {
      const httpResponseMockWithInvalidHeaders = {
        headers: new HttpHeaders({
          Location: '/api/v1/books/foo',
        }),
      } as HttpResponse<any>;
      httpClientSpy.post.and.returnValue(of(httpResponseMockWithInvalidHeaders));

      bookService.createBook(newBookMock).subscribe(
        null,
        (error) => expect(error).toBe('Invalid location header'),
      );
    });
  });
});
