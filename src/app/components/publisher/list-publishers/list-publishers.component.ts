import {
  Component,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  takeUntil,
} from 'rxjs/operators';

import {
  PublisherService,
  ResourceService,
} from '../../../api';
import { IPublisherDTO } from '../../../interfaces/dtos/PublisherDTO';
import {
  ProfileService,
  SpinnerService,
} from '../../../services';
import { BaseComponent } from '../../common/base/base.component';

@Component({
  selector: 'app-list-publishers',
  templateUrl: './list-publishers.component.html',
})
export class ListPublishersComponent extends BaseComponent implements OnInit {
  public publishers: IPublisherDTO[] = [];
  public queryString: string;
  private searchTerm = new Subject<string>();

  constructor(
    private profileService: ProfileService,
    private publisherService: PublisherService,
    private resourceService: ResourceService,
    private route: ActivatedRoute,
    private router: Router,
    private spinnerService: SpinnerService,
    private toastr: ToastrService,
  ) {
    super();
  }

  ngOnInit() {
    this.queryString = this.route.snapshot.queryParamMap.get('q');
    this.getPublishers(this.queryString);
    this.searchTerm.pipe(
      takeUntil(this.destroyed$),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term: string) => this.publisherService.getPublishers(term)),
    ).subscribe(
      (publishers) => this.publishers = publishers,
      (err) => this.toastr.error(err),
    );
  }

  createPublisher() {
    this.router.navigate([ 'create' ], { relativeTo: this.route });
  }

  onDelete(publisher: IPublisherDTO) {
    this.resourceService.request(publisher._links.delete)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        () => {
          const publisherIndex = this.publishers.findIndex((existingPublisher) => existingPublisher === publisher);
          if (publisherIndex !== -1) {
            this.publishers.splice(publisherIndex, 1);
          }
        },
        (err) => this.toastr.error(err),
      );
  }

  onSearchTextChange(text: string) {
    this.searchTerm.next(text);
  }

  get isLoading() {
    return this.spinnerService.matches(['GET', /\/api\/v1\/publishers/]);
  }

  get profile$() {
    return this.profileService.getProfile();
  }

  private getPublishers(query?: string) {
    this.publisherService.getPublishers(query)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (publishers) => this.publishers = publishers,
        (err) => this.toastr.error(err),
      );
  }
}
