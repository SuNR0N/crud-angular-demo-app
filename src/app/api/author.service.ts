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
  IAuthorDTO,
  INewAuthorDTO,
} from '../interfaces/dtos';
import { API_PREFIX } from '../config/config';
import { MessageService } from '../services/message.service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorService extends BaseService {
  private authorsUrl = `${API_PREFIX}/authors`;

  constructor(
    private http: HttpClient,
    messageService: MessageService,
  ) {
    super(messageService);
  }

  getAuthors(query?: string): Observable<IAuthorDTO[]> {
    let params = new HttpParams();
    if (query) {
      params = params.set('q', query);
    }
    return this.http.get<IAuthorDTO[]>(this.authorsUrl, { params })
      .pipe(
        tap((_) => this.log('fetched authors')),
        catchError(this.handleError<IAuthorDTO[]>('getAuthors', []))
      );
  }

  getAuthor(id: number): Observable<IAuthorDTO> {
    return this.http.get<IAuthorDTO>(`${this.authorsUrl}/${id}`)
      .pipe(
        tap((_) => this.log(`fetched author id=${id}`)),
        catchError(this.handleError<IAuthorDTO>(`getAuthor id=${id}`))
      );
  }

  createAuthor(author: INewAuthorDTO) {
    return this.http.post(this.authorsUrl, author, this.httpOptions)
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
        catchError(this.handleError<IAuthorDTO>(`createAuthor author=${author}`))
      );
  }
}
