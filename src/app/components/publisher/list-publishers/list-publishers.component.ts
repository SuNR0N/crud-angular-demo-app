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
import { PublisherService } from '../../../api/publisher.service';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-list-publishers',
  templateUrl: './list-publishers.component.html',
  styleUrls: ['./list-publishers.component.scss']
})
export class ListPublishersComponent implements OnInit {
  public publishers: IPublisherDTO[] = [];
  private searchTerm = new Subject<string>();

  constructor(
    private profileService: ProfileService,
    private publisherService: PublisherService,
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

  getPublishers(query?: string) {
    this.publisherService.getPublishers(query)
      .subscribe((publishers) => this.publishers = publishers);
  }

  onSearchTextChange(text: string) {
    this.searchTerm.next(text);
  }

  get profile$() {
    return this.profileService.getProfile();
  }
}
