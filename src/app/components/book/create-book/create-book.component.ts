import {
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import {
  AuthorService,
  CategoryService,
  BookService,
  PublisherService,
} from '../../../api';
import {
  ICategoryDTO,
  INewBookDTO,
  IPublisherDTO,
  IAuthorDTO,
} from '../../../interfaces/dtos';
import {
  isbn10Validator,
  isbn13Validator,
} from '../validators';
import {
  isbn10Checksum,
  isbn10Length,
  isbn13Checksum,
  isbn13Length,
} from '../../../constants/validation-errors';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
})
export class CreateBookComponent implements OnInit {
  public authors: IAuthorDTO[];
  public categories: ICategoryDTO[];
  public createBookForm = this.fb.group({
    authors: [
      [],
    ],
    categories: [
      [],
    ],
    isbn10: [
      '',
      [
        Validators.minLength(10),
        Validators.maxLength(10),
        isbn10Validator,
      ],
    ],
    isbn13: [
      '',
      [
        Validators.required,
        Validators.minLength(13),
        Validators.maxLength(13),
        isbn13Validator,
      ],
    ],
    publicationDate: [
      null,
    ],
    publishers: [
      [],
    ],
    title: [
      '',
      Validators.required,
    ],
  });
  public publishers: IPublisherDTO[];

  constructor(
    private authorService: AuthorService,
    private bookService: BookService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private publisherService: PublisherService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.loadAuthors();
    this.loadCategories();
    this.loadPublishers();
  }

  listBooks() {
    this.router.navigate([ 'books' ]);
  }

  onSubmit() {
    const newBook: INewBookDTO = {
      ...this.createBookForm.value,
    };
    this.bookService.createBook(newBook)
      .subscribe(
        () => this.router.navigate([ 'books' ]),
        (err) => this.toastr.error(err),
      );
  }

  get isbn10ErrorDefinitions() {
    return {
      isbn10: isbn10Checksum,
      minlength: isbn10Length,
      maxlength: isbn10Length,
    };
  }

  get isbn13ErrorDefinitions() {
    return {
      isbn13: isbn13Checksum,
      minlength: isbn13Length,
      maxlength: isbn13Length,
    };
  }

  private loadAuthors() {
    this.authorService.getAuthors()
      .subscribe(
        (authors) => this.authors = authors,
        (err) => this.toastr.error(err),
      );
  }

  private loadCategories() {
    this.categoryService.getCategories()
      .subscribe(
        (categories) => this.categories = categories,
        (err) => this.toastr.error(err),
      );
  }

  private loadPublishers() {
    this.publisherService.getPublishers()
      .subscribe(
        (publishers) => this.publishers = publishers,
        (err) => this.toastr.error(err),
      );
  }
}
