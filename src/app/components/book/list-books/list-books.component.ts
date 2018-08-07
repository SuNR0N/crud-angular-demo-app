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

import { BookService } from '../../../api/book.service';
import {
  IPageableCollectionDTO,
  IBookDTO,
} from '../../../interfaces/dtos';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.scss']
})
export class ListBooksComponent implements OnInit {
  public collection: IPageableCollectionDTO<IBookDTO> = {
    content: [],
    currentPage: 0,
    totalItems: 0,
    totalPages: 0,
  };
  private searchTerm = new Subject<string>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
  ) { }

  ngOnInit() {
    this.getBooks();
    this.searchTerm.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term: string) => this.bookService.getBooks(term)),
    ).subscribe((collection) => this.collection = collection);
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
}
