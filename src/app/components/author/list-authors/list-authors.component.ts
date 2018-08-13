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
  AuthorService,
  ResourceService,
} from '../../../api';
import { IAuthorDTO } from '../../../interfaces/dtos/AuthorDTO';
import {
  ProfileService,
  SpinnerService,
} from '../../../services';
import { BaseComponent } from '../../common/base/base.component';

@Component({
  selector: 'app-list-authors',
  templateUrl: './list-authors.component.html',
})
export class ListAuthorsComponent extends BaseComponent implements OnInit {
  public authors: IAuthorDTO[] = [];
  public queryString: string;
  private searchTerm = new Subject<string>();

  constructor(
    private authorService: AuthorService,
    private profileService: ProfileService,
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
    this.getAuthors(this.queryString);
    this.searchTerm.pipe(
      takeUntil(this.destroyed$),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term: string) => this.authorService.getAuthors(term)),
    ).subscribe(
      (authors) => this.authors = authors,
      (err) => this.toastr.error(err),
    );
  }

  createAuthor() {
    this.router.navigate([ 'create' ], { relativeTo: this.route });
  }

  onDelete(author: IAuthorDTO) {
    this.resourceService.request(author._links.delete)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        () => {
          const authorIndex = this.authors.findIndex((existingAuthor) => existingAuthor === author);
          if (authorIndex !== -1) {
            this.authors.splice(authorIndex, 1);
          }
        },
        (err) => this.toastr.error(err),
      );
  }

  onSearchTextChange(text: string) {
    this.searchTerm.next(text);
  }

  get isLoading() {
    return this.spinnerService.matches(['GET', /\/api\/v1\/authors/]);
  }

  get profile$() {
    return this.profileService.getProfile();
  }

  private getAuthors(query?: string) {
    this.authorService.getAuthors(query)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (authors) => this.authors = authors,
        (err) => this.toastr.error(err),
      );
  }
}
