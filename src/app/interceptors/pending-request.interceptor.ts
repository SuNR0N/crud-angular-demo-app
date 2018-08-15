import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { SpinnerService } from '../services/spinner.service';

@Injectable()
export class PendingRequestInterceptor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.addRequest(request);
    return next.handle(request).pipe(
      tap(null,
        () => this.spinnerService.removeRequest(request),
        () => this.spinnerService.removeRequest(request),
      ),
    );
  }
}
