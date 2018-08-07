import {
  Component,
  Input,
} from '@angular/core';
import { Router } from '@angular/router';

import { IBookDTO } from '../../../interfaces/dtos/BookDTO';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[appBookRow]',
  templateUrl: './book-row.component.html',
  styleUrls: ['./book-row.component.scss']
})
export class BookRowComponent {
  @Input() book: IBookDTO;

  constructor(private router: Router) { }

  deleteBook(book: IBookDTO) {
    // TODO
  }

  editBook(book: IBookDTO) {
    this.router.navigate([ 'books', book.id, 'edit' ]);
  }

  viewBook(book: IBookDTO) {
    this.router.navigate([ 'books', book.id ]);
  }
}
