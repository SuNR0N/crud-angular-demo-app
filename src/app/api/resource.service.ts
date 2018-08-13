import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  catchError,
  tap,
} from 'rxjs/operators';

import { IHATEOASLink } from '../interfaces/HATEOASLink';
import { MessageService } from '../services/message.service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ResourceService extends BaseService {
  constructor(
    private http: HttpClient,
    messageService: MessageService,
  ) {
    super(messageService);
  }

  request<T>(link: IHATEOASLink, data?: any): Observable<T> {
    const httpOptions = data ? {
      headers: this.httpOptions.headers,
      body: data,
    } : {};
    return this.http.request<T>(link.method, link.href, httpOptions)
      .pipe(
        tap((_) => this.log('request finished')),
        catchError(this.handleError('request')),
      );
  }
}
