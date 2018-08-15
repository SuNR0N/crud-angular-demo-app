import {
  HttpClient,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  catchError,
  map,
  tap,
} from 'rxjs/operators';

import { API_PREFIX } from '../config/config';
import {
  IBookDTO,
  INewBookDTO,
  IPageableCollectionDTO,
} from '../interfaces/dtos';
import { MessageService } from '../services/message.service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class BookService extends BaseService {
  private booksUrl = `${API_PREFIX}/books`;

  constructor(
    private http: HttpClient,
    messageService: MessageService,
  ) {
    super(messageService);
  }

  getBooks(query?: string): Observable<IPageableCollectionDTO<IBookDTO>> {
    let params = new HttpParams();
    if (query) {
      params = params.set('q', query);
    }
    return this.http.get<IPageableCollectionDTO<IBookDTO>>(this.booksUrl, { params })
      .pipe(
        tap((_) => this.log('fetched books')),
        catchError(this.handleError('getBooks')),
      );
  }

  getBook(id: number): Observable<IBookDTO> {
    return this.http.get<IBookDTO>(`${this.booksUrl}/${id}`)
      .pipe(
        tap((_) => this.log(`fetched book id=${id}`)),
        catchError(this.handleError(`getBook id=${id}`)),
      );
  }

  createBook(book: INewBookDTO) {
    return this.http.post(this.booksUrl, book, this.httpOptions)
      .pipe(
        tap((_) => this.log(`created book=${JSON.stringify(book)}`)),
        map((response: HttpResponse<any>) => {
          const locationRegExp = /\/(\d{1,})$/;
          const locationHeaderValue = response.headers.get('Location');
          const locationRegExpExec = locationRegExp.exec(locationHeaderValue);
          if (!locationRegExpExec) {
            throw new Error('Invalid location header');
          }
          return parseInt(locationRegExpExec[1], 10);
        }),
        catchError(this.handleError(`createBook book=${JSON.stringify(book)}`)),
      );
  }
}
