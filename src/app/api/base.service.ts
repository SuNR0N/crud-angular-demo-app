import { HttpHeaders } from '@angular/common/http';
import {
  Observable,
  of,
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

  protected handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  protected log(message: string) {
    this.messageService.add(`${this.constructor.name}: ${message}`);
  }
}
