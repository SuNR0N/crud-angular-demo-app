import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { SpinnerService } from '../services/spinner.service';

@Injectable()
export class PendingRequestInterceptor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.addRequest(request);
    return next.handle(request).pipe(
      tap(() => {}, () => {},
        () => {
          this.spinnerService.removeRequest(request);
        }
      )
    );
  }
}
