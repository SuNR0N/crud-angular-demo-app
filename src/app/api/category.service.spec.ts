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
  ICategoryDTO,
  INewCategoryDTO,
} from '../interfaces/dtos';
import { CategoryService } from './category.service';

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let httpClientMock: MockHttpClient;

  beforeEach(() => {
    httpClientMock = new MockHttpClient();
    categoryService = new CategoryService(httpClientMock as any, new MockMessageService() as any);
  });

  describe('getCategories', () => {
    const categoriesMock: ICategoryDTO[] = [];

    it('should be called with the proper URL', () => {
      httpClientMock.get.and.returnValue(of(categoriesMock));

      categoryService.getCategories().subscribe();

      expect(httpClientMock.get).toHaveBeenCalledWith('/api/v1/categories', jasmine.anything());
    });

    it('should call the URL with a query param if it is provided', () => {
      httpClientMock.get.and.returnValue(of(categoriesMock));

      categoryService.getCategories('foo').subscribe();

      const options = httpClientMock.get.calls.mostRecent().args[1];
      expect(options.params.get('q')).toBe('foo');
    });

    it('should return the categories', () => {
      httpClientMock.get.and.returnValue(of(categoriesMock));

      categoryService.getCategories().subscribe(
        (categories) => expect(categories).toBe(categoriesMock),
      );
      expect(httpClientMock.get).toHaveBeenCalledTimes(1);
    });

    it('should log a message', () => {
      httpClientMock.get.and.returnValue(of(categoriesMock));
      const logSpy = spyOn(categoryService as any, 'log').and.callThrough();

      categoryService.getCategories().subscribe();

      expect(logSpy).toHaveBeenCalledWith('fetched categories');
      expect(logSpy).toHaveBeenCalledTimes(1);
    });

    it('should set the error operation', () => {
      httpClientMock.get.and.returnValue(of(categoriesMock));
      const handleErrorSpy = spyOn(categoryService as any, 'handleError').and.callThrough();

      categoryService.getCategories().subscribe();

      expect(handleErrorSpy).toHaveBeenCalledWith('getCategories');
      expect(handleErrorSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle the error', () => {
      httpClientMock.get.and.returnValue(throwError(new Error('Error')));

      categoryService.getCategories().subscribe(
        null,
        (error) => expect(error).toBe('Error'),
      );
    });
  });

  describe('getCategory', () => {
    const categoryMock = {} as ICategoryDTO;

    it('should be called with the proper URL', () => {
      httpClientMock.get.and.returnValue(of(categoryMock));

      categoryService.getCategory(1).subscribe();

      expect(httpClientMock.get).toHaveBeenCalledWith('/api/v1/categories/1');
    });

    it('should return the category', () => {
      httpClientMock.get.and.returnValue(of(categoryMock));

      categoryService.getCategory(1).subscribe(
        (category) => expect(category).toBe(categoryMock),
      );
      expect(httpClientMock.get).toHaveBeenCalledTimes(1);
    });

    it('should log a message', () => {
      httpClientMock.get.and.returnValue(of(categoryMock));
      const logSpy = spyOn(categoryService as any, 'log').and.callThrough();

      categoryService.getCategory(1).subscribe();

      expect(logSpy).toHaveBeenCalledWith('fetched category id=1');
      expect(logSpy).toHaveBeenCalledTimes(1);
    });

    it('should set the error operation', () => {
      httpClientMock.get.and.returnValue(of(categoryMock));
      const handleErrorSpy = spyOn(categoryService as any, 'handleError').and.callThrough();

      categoryService.getCategory(1).subscribe();

      expect(handleErrorSpy).toHaveBeenCalledWith('getCategory id=1');
      expect(handleErrorSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle the error', () => {
      httpClientMock.get.and.returnValue(throwError(new Error('Error')));

      categoryService.getCategory(1).subscribe(
        null,
        (error) => expect(error).toBe('Error'),
      );
    });
  });

  describe('createCategory', () => {
    const newCategoryMock = {} as INewCategoryDTO;
    const httpResponseMock = {
      headers: new HttpHeaders({ Location: '/api/v1/categories/3' }),
    } as HttpResponse<any>;

    it('should be called with the proper URL', () => {
      httpClientMock.post.and.returnValue(of(httpResponseMock));

      categoryService.createCategory(newCategoryMock).subscribe();

      expect(httpClientMock.post).toHaveBeenCalledWith('/api/v1/categories', newCategoryMock, jasmine.anything());
    });

    it('should return the id of the created entity', () => {
      httpClientMock.post.and.returnValue(of(httpResponseMock));

      categoryService.createCategory(newCategoryMock).subscribe(
        (id) => expect(id).toBe(3),
      );
    });

    it('should log a message', () => {
      httpClientMock.post.and.returnValue(of(httpResponseMock));
      const logSpy = spyOn(categoryService as any, 'log').and.callThrough();

      categoryService.createCategory(newCategoryMock).subscribe();

      expect(logSpy).toHaveBeenCalledWith('created category={}');
      expect(logSpy).toHaveBeenCalledTimes(1);
    });

    it('should set the error operation', () => {
      httpClientMock.post.and.returnValue(of(httpResponseMock));
      const handleErrorSpy = spyOn(categoryService as any, 'handleError').and.callThrough();

      categoryService.createCategory(newCategoryMock).subscribe();

      expect(handleErrorSpy).toHaveBeenCalledWith('createCategory category={}');
      expect(handleErrorSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle the error', () => {
      httpClientMock.post.and.returnValue(throwError(new Error('Error')));

      categoryService.createCategory(newCategoryMock).subscribe(
        null,
        (error) => expect(error).toBe('Error'),
      );
    });

    it('should throw an error if the location header does not exist', () => {
      const httpResponseMockWithoutHeaders = {
        headers: new HttpHeaders(),
      } as HttpResponse<any>;
      httpClientMock.post.and.returnValue(of(httpResponseMockWithoutHeaders));

      categoryService.createCategory(newCategoryMock).subscribe(
        null,
        (error) => expect(error).toBe('Invalid location header'),
      );
    });

    it('should throw an error if the location header is invalid', () => {
      const httpResponseMockWithInvalidHeaders = {
        headers: new HttpHeaders({
          Location: '/api/v1/categories/foo',
        }),
      } as HttpResponse<any>;
      httpClientMock.post.and.returnValue(of(httpResponseMockWithInvalidHeaders));

      categoryService.createCategory(newCategoryMock).subscribe(
        null,
        (error) => expect(error).toBe('Invalid location header'),
      );
    });
  });
});
