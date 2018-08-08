import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { tap } from 'rxjs/operators';

import { IPublisherDTO } from '../../interfaces/dtos/PublisherDTO';
import { PublisherService } from '../../api/publisher.service';

@Injectable()
export class PublisherResolve implements Resolve<IPublisherDTO> {
  private publisher: IPublisherDTO;

  constructor(private publisherService: PublisherService) { }

  setPublisher(publisher: IPublisherDTO) {
    this.publisher = publisher;
  }

  resolve(route: ActivatedRouteSnapshot) {
    const id = Number(route.paramMap.get('id'));
    if (this.publisher && this.publisher.id === id) {
      return this.publisher;
    } else {
      return this.publisherService.getPublisher(id).pipe(
        tap((publisher) => this.publisher = publisher),
      );
    }
  }
}
