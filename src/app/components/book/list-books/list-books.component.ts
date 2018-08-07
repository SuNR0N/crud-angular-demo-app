import { Component, OnInit } from '@angular/core';

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
  collection: IPageableCollectionDTO<IBookDTO> = {
    content: [],
    currentPage: 0,
    totalItems: 0,
    totalPages: 0,
  };

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.getBooks();
  }

  getBooks(query?: string) {
    this.bookService.getBooks(query)
      .subscribe((collection) => this.collection = collection);
  }
}
