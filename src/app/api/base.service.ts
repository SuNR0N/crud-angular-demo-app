import {
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import {
  Observable,
  throwError,
} from 'rxjs';

import { MessageService } from '../services/message.service';

export class BaseService {
  protected httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    observe: 'response' as 'response',
    responseType: 'text' as 'text',
  };

  constructor(private messageService: MessageService) { }

  protected handleError(operation = 'operation') {
    return (error: HttpErrorResponse | Error): Observable<any> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return throwError(error instanceof HttpErrorResponse ? error.error : error.message);
    };
  }

  protected log(message: string) {
    this.messageService.add(`${this.constructor.name}: ${message}`);
  }
}
