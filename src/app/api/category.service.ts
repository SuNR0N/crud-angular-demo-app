import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  catchError,
  map,
  tap,
} from 'rxjs/operators';

import {
  ICategoryDTO,
  INewCategoryDTO,
} from '../interfaces/dtos';
import { API_PREFIX } from '../config/config';
import { MessageService } from '../services/message.service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {
  private categoriesUrl = `${API_PREFIX}/categories`;

  constructor(
    private http: HttpClient,
    messageService: MessageService,
  ) {
    super(messageService);
  }

  getCategories(query?: string): Observable<ICategoryDTO[]> {
    let params = new HttpParams();
    if (query) {
      params = params.set('q', query);
    }
    return this.http.get<ICategoryDTO[]>(this.categoriesUrl, { params })
      .pipe(
        tap((_) => this.log('fetched categories')),
        catchError(this.handleError('getCategories'))
      );
  }

  getCategory(id: number): Observable<ICategoryDTO> {
    return this.http.get<ICategoryDTO>(`${this.categoriesUrl}/${id}`)
      .pipe(
        tap((_) => this.log(`fetched category id=${id}`)),
        catchError(this.handleError(`getCategory id=${id}`))
      );
  }

  createCategory(category: INewCategoryDTO) {
    return this.http.post(this.categoriesUrl, category, this.httpOptions)
      .pipe(
        map((response: HttpResponse<any>) => {
          const locationRegExp = /\/(\d{1,})$/;
          const locationHeaderValue = response.headers.get('Location');
          const locationRegExpExec = locationRegExp.exec(locationHeaderValue);
          if (!locationRegExpExec) {
            throw new Error('Invalid location header');
          }
          return parseInt(locationRegExpExec[1], 10);
        }),
        catchError(this.handleError(`createCategory category=${category}`))
      );
  }
}
