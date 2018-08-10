import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  catchError,
  tap,
} from 'rxjs/operators';

import { IProfileDTO } from '../interfaces/dtos/ProfileDTO';
import { API_PREFIX } from '../config/config';
import { MessageService } from '../services/message.service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  private authUrl = `${API_PREFIX}/auth`;

  constructor(
    private http: HttpClient,
    messageService: MessageService,
  ) {
    super(messageService);
  }

  getProfile(): Observable<IProfileDTO> {
    return this.http.get<IProfileDTO>(`${this.authUrl}/profile`)
      .pipe(
        tap((_) => this.log('fetched profile')),
        catchError(this.handleError('getProfile'))
      );
  }

  logOut(): Observable<string> {
    return this.http.post(`${this.authUrl}/logout`, null, { responseType: 'text' })
      .pipe(
        tap((_) => this.log('logged out')),
        catchError(this.handleError('logOut'))
      );
  }
}
