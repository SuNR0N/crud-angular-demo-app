import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import {
  tap,
  map,
} from 'rxjs/operators';

import { IBookDTO } from '../../../interfaces/dtos/BookDTO';
import { BookService } from '../../../api/book.service';

@Injectable()
export class BookResolver implements Resolve<IBookDTO> {
  private book: IBookDTO;

  constructor(
    private bookService: BookService,
    private router: Router,
  ) {}

  setBook(book: IBookDTO) {
    this.book = book;
  }

  resolve(route: ActivatedRouteSnapshot) {
    const id = Number(route.paramMap.get('id'));
    if (this.book && this.book.id === id) {
      return this.actionMapper(route, this.book);
    } else {
      return this.bookService.getBook(id).pipe(
        tap((book) => this.book = book),
        map((book) => this.actionMapper(route, book)),
      );
    }
  }

  private actionMapper(route: ActivatedRouteSnapshot, book: IBookDTO) {
    if (route.routeConfig.path.match(/edit$/) && book._links.update === undefined) {
      this.router.navigate([ '/books' ]);
      return null;
    } else {
      return book;
    }
  }
}
