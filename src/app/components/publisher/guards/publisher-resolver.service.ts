import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
} from '@angular/router';
import {
  map,
  tap,
} from 'rxjs/operators';

import { PublisherService } from '../../../api/publisher.service';
import { IPublisherDTO } from '../../../interfaces/dtos/PublisherDTO';

@Injectable()
export class PublisherResolver implements Resolve<IPublisherDTO> {
  private publisher: IPublisherDTO;

  constructor(
    private publisherService: PublisherService,
    private router: Router,
  ) { }

  setPublisher(publisher: IPublisherDTO) {
    this.publisher = publisher;
  }

  resolve(route: ActivatedRouteSnapshot) {
    const id = Number(route.paramMap.get('id'));
    if (this.publisher && this.publisher.id === id) {
      return this.actionMapper(route, this.publisher);
    } else {
      return this.publisherService.getPublisher(id).pipe(
        tap((publisher) => this.publisher = publisher),
        map((publisher) => this.actionMapper(route, publisher)),
      );
    }
  }

  private actionMapper(route: ActivatedRouteSnapshot, publisher: IPublisherDTO) {
    if (route.routeConfig.path.match(/edit$/) && publisher._links.update === undefined) {
      this.router.navigate([ '/publishers' ]);
      return null;
    } else {
      return publisher;
    }
  }
}
