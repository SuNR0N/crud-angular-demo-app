import {
  Component,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  ParamMap,
  Router,
} from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { BookService } from '../../../api/book.service';
import { IBookDTO } from '../../../interfaces/dtos/BookDTO';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.scss']
})
export class ViewBookComponent implements OnInit {
  book: IBookDTO;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.bookService.getBook(Number(params.get('id'))))
    ).subscribe((book) => this.book = book);
  }

  deleteBook() {
    // TODO
  }

  editBook(book: IBookDTO) {
    this.router.navigate([ 'edit' ], { relativeTo: this.route });
  }
}
