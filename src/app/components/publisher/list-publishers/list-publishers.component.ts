import {
  Component,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';
import {
  Router,
  ActivatedRoute,
} from '@angular/router';

import { IPublisherDTO } from '../../../interfaces/dtos/PublisherDTO';
import {
  PublisherService,
  ResourceService,
} from '../../../api';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-list-publishers',
  templateUrl: './list-publishers.component.html',
})
export class ListPublishersComponent implements OnInit {
  public publishers: IPublisherDTO[] = [];
  private searchTerm = new Subject<string>();

  constructor(
    private profileService: ProfileService,
    private publisherService: PublisherService,
    private resourceService: ResourceService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getPublishers();
    this.searchTerm.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term: string) => this.publisherService.getPublishers(term)),
    ).subscribe((publishers) => this.publishers = publishers);
  }

  createPublisher() {
    this.router.navigate([ 'create' ], { relativeTo: this.route });
  }

  onDelete(publisher: IPublisherDTO) {
    this.resourceService.request(publisher._links.delete)
      .subscribe(() => {
        const publisherIndex = this.publishers.findIndex((existingPublisher) => existingPublisher === publisher);
        if (publisherIndex !== -1) {
          this.publishers.splice(publisherIndex, 1);
        }
      });
  }

  onSearchTextChange(text: string) {
    this.searchTerm.next(text);
  }

  get profile$() {
    return this.profileService.getProfile();
  }

  private getPublishers(query?: string) {
    this.publisherService.getPublishers(query)
      .subscribe((publishers) => this.publishers = publishers);
  }
}
