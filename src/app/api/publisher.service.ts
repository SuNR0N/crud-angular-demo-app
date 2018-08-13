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
  INewPublisherDTO,
  IPublisherDTO,
} from '../interfaces/dtos';
import { MessageService } from '../services/message.service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class PublisherService extends BaseService {
  private publishersUrl = `${API_PREFIX}/publishers`;

  constructor(
    private http: HttpClient,
    messageService: MessageService,
  ) {
    super(messageService);
  }

  getPublishers(query?: string): Observable<IPublisherDTO[]> {
    let params = new HttpParams();
    if (query) {
      params = params.set('q', query);
    }
    return this.http.get<IPublisherDTO[]>(this.publishersUrl, { params })
      .pipe(
        tap((_) => this.log('fetched publishers')),
        catchError(this.handleError('getPublishers')),
      );
  }

  getPublisher(id: number): Observable<IPublisherDTO> {
    return this.http.get<IPublisherDTO>(`${this.publishersUrl}/${id}`)
      .pipe(
        tap((_) => this.log(`fetched publisher id=${id}`)),
        catchError(this.handleError(`getPublisher id=${id}`)),
      );
  }

  createPublisher(publisher: INewPublisherDTO) {
    return this.http.post(this.publishersUrl, publisher, this.httpOptions)
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
        catchError(this.handleError(`createPublisher publisher=${publisher}`)),
      );
  }
}
