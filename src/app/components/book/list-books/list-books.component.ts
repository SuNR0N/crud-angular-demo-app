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

import { BookService } from '../../../api/book.service';
import {
  IPageableCollectionDTO,
  IBookDTO,
} from '../../../interfaces/dtos';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.scss']
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

  getBooks(query?: string) {
    this.bookService.getBooks(query)
      .subscribe((collection) => this.collection = collection);
  }

  onSearchTextChange(text: string) {
    this.searchTerm.next(text);
  }

  get profile$() {
    return this.profileService.getProfile();
  }
}
