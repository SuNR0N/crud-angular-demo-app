import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { tap } from 'rxjs/operators';

import { IBookDTO } from '../../interfaces/dtos/BookDTO';
import { BookService } from '../../api/book.service';

@Injectable()
export class BookResolve implements Resolve<IBookDTO> {
  private book: IBookDTO;

  constructor(private bookService: BookService) {}

  setBook(book: IBookDTO) {
    this.book = book;
  }

  resolve(route: ActivatedRouteSnapshot) {
    const id = Number(route.paramMap.get('id'));
    if (this.book && this.book.id === id) {
      return this.book;
    } else {
      return this.bookService.getBook(id).pipe(
        tap((book) => this.book = book),
      );
    }
  }
}
