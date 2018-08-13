import {
  Component,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
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
  BookService,
  ResourceService,
} from '../../../api';
import {
  IBookDTO,
  IHATEOASLink,
  IPageableCollectionDTO,
} from '../../../interfaces';
import {
  ProfileService,
  SpinnerService,
} from '../../../services';
import { BaseComponent } from '../../common/base/base.component';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
})
export class ListBooksComponent extends BaseComponent implements OnInit {
  public collection: IPageableCollectionDTO<IBookDTO> = {
    content: [],
    currentPage: 0,
    totalItems: 0,
    totalPages: 0,
  };
  public queryString: string;
  private searchTerm = new Subject<string>();

  constructor(
    private bookService: BookService,
    private profileService: ProfileService,
    private resourceService: ResourceService,
    private route: ActivatedRoute,
    private router: Router,
    private spinnerService: SpinnerService,
    private toastr: ToastrService,
  ) {
    super();
    this.initialiseRouterEvents();
  }

  ngOnInit() {
    this.searchTerm.pipe(
      takeUntil(this.destroyed$),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term: string) => this.bookService.getBooks(term)),
    ).subscribe(
      (collection) => this.collection = collection,
      (err) => this.toastr.error(err),
    );
  }

  createBook() {
    this.router.navigate([ 'create' ], { relativeTo: this.route });
  }

  onDelete(book: IBookDTO) {
    this.resourceService.request(book._links.delete)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        () => {
          const bookIndex = this.collection.content.findIndex((existingBook) => existingBook === book);
          if (bookIndex !== -1) {
            this.collection.content.splice(bookIndex, 1);
          }
        },
        (err) => this.toastr.error(err),
      );
  }

  onPaginate(link: IHATEOASLink) {
    this.resourceService.request<IPageableCollectionDTO<IBookDTO>>(link)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (collection) => this.collection = collection,
        (err) => this.toastr.error(err),
      );
  }

  onSearchTextChange(text: string) {
    this.searchTerm.next(text);
  }

  get isLoading() {
    return this.spinnerService.matches(['GET', /\/api\/v1\/books/]);
  }

  get profile$() {
    return this.profileService.getProfile();
  }

  private getBooks(query?: string) {
    this.bookService.getBooks(query)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (collection) => this.collection = collection,
        (err) => this.toastr.error(err),
      );
  }

  private initialiseRouterEvents() {
    this.router.events
      .pipe(takeUntil(this.destroyed$))
      .subscribe((e: any) => {
        if (e instanceof NavigationEnd) {
          this.queryString = this.route.snapshot.queryParamMap.get('q');
          this.getBooks(this.queryString);
        }
      });
  }
}
