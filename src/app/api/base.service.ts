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

  constructor(
    private messageService: MessageService,
  ) { }

  protected handleError (operation = 'operation') {
    return (response: HttpErrorResponse): Observable<any> => {
      console.error(response);
      this.log(`${operation} failed: ${response.message}`);
      return throwError(response.error);
    };
  }

  protected log(message: string) {
    this.messageService.add(`${this.constructor.name}: ${message}`);
  }
}
