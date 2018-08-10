import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  Subject,
  Subscription,
} from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';
import {
  Router,
  ActivatedRoute,
  NavigationEnd,
} from '@angular/router';

import {
  BookService,
  ResourceService,
} from '../../../api';
import {
  IPageableCollectionDTO,
  IBookDTO,
} from '../../../interfaces/dtos';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
})
export class ListBooksComponent implements OnInit, OnDestroy {
  public collection: IPageableCollectionDTO<IBookDTO> = {
    content: [],
    currentPage: 0,
    totalItems: 0,
    totalPages: 0,
  };
  private searchTerm = new Subject<string>();
  private navigationSubscription: Subscription;

  constructor(
    private bookService: BookService,
    private profileService: ProfileService,
    private resourceService: ResourceService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.navigationSubscription = this.router.events
      .subscribe((e: any) => {
        if (e instanceof NavigationEnd) {
          this.getBooks();
        }
      });
  }

  ngOnInit() {
    this.getBooks();
    this.searchTerm.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term: string) => this.bookService.getBooks(term)),
    ).subscribe((collection) => this.collection = collection);
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  createBook() {
    this.router.navigate([ 'create' ], { relativeTo: this.route });
  }

  onDelete(book: IBookDTO) {
    this.resourceService.request(book._links.delete)
      .subscribe(() => {
        const bookIndex = this.collection.content.findIndex((existingBook) => existingBook === book);
        if (bookIndex !== -1) {
          this.collection.content.splice(bookIndex, 1);
        }
      });
  }

  onSearchTextChange(text: string) {
    this.searchTerm.next(text);
  }

  get profile$() {
    return this.profileService.getProfile();
  }

  private getBooks(query?: string) {
    this.bookService.getBooks(query)
      .subscribe((collection) => this.collection = collection);
  }
}
