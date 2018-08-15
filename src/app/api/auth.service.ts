import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  catchError,
  tap,
} from 'rxjs/operators';

import { API_PREFIX } from '../config/config';
import { IProfileDTO } from '../interfaces/dtos/ProfileDTO';
import { MessageService } from '../services/message.service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
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
        catchError(this.handleError('getProfile')),
      );
  }

  logOut(): Observable<string> {
    return this.http.post(`${this.authUrl}/logout`, null)
      .pipe(
        tap((_) => this.log('logged out')),
        catchError(this.handleError('logOut')),
      );
  }
}
