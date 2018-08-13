import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
} from '@angular/router';
import {
  map,
  tap,
} from 'rxjs/operators';

import { BookService } from '../../../api/book.service';
import { IBookDTO } from '../../../interfaces/dtos/BookDTO';
import { ProfileService } from '../../../services/profile.service';

@Injectable()
export class BookResolver implements Resolve<IBookDTO> {
  private book: IBookDTO;

  constructor(
    private bookService: BookService,
    private profileService: ProfileService,
    private router: Router,
  ) {
    this.init();
  }

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
      this.router.navigate([ '/books', route.params.id ]);
      return null;
    } else {
      return book;
    }
  }

  private init() {
    this.profileService.getProfile()
      .subscribe((profile) => {
        if (!profile) {
          this.book = null;
        }
      });
  }
}
