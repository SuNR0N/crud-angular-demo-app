import {
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
import {
  Router,
  ActivatedRoute,
} from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';

import {
  AuthorService,
  CategoryService,
  PublisherService,
  ResourceService,
} from '../../../api';
import {
  ICategoryDTO,
  IPublisherDTO,
  IAuthorDTO,
  IBookUpdateDTO,
  IBookDTO,
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
import { BookResolver } from '../guards/book-resolver.service';
import { BaseComponent } from '../../common/base/base.component';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
})
export class EditBookComponent extends BaseComponent implements OnInit {
  public authors: IAuthorDTO[];
  public book: IBookDTO;
  public categories: ICategoryDTO[];
  public editBookForm = this.fb.group({
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
    private bookResolver: BookResolver,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private location: Location,
    private publisherService: PublisherService,
    private resourceService: ResourceService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) {
    super();
  }

  ngOnInit() {
    this.book = this.route.snapshot.data['book'];
    this.loadAuthors();
    this.loadCategories();
    this.loadPublishers();
    this.editBookForm.patchValue({
      isbn10: this.book.isbn10,
      isbn13: this.book.isbn13,
      publicationDate: this.book.publicationDate,
      title: this.book.title,
    });
  }

  cancel() {
    this.location.back();
  }

  onSubmit() {
    const updatedBook: IBookUpdateDTO = {
      ...(
        JSON.stringify(this.book.authors) !== JSON.stringify(this.editBookForm.value.authors) ?
        { authors: this.editBookForm.value.authors } :
        {}
      ),
      ...(
        JSON.stringify(this.book.categories) !== JSON.stringify(this.editBookForm.value.categories) ?
        { categories: this.editBookForm.value.categories } :
        {}
      ),
      ...(
        this.book.isbn10 !== this.editBookForm.value.isbn10 ?
        { isbn10: this.editBookForm.value.isbn10 } :
        {}
      ),
      ...(
        this.book.isbn13 !== this.editBookForm.value.isbn13 ?
        { isbn13: this.editBookForm.value.isbn13 } :
        {}
      ),
      ...(
        this.book.publicationDate !== this.editBookForm.value.publicationDate ?
        { publicationDate: this.editBookForm.value.publicationDate } :
        {}
      ),
      ...(
        JSON.stringify(this.book.publishers) !== JSON.stringify(this.editBookForm.value.publishers) ?
        { publishers: this.editBookForm.value.publishers } :
        {}
      ),
      ...(
        this.book.title !== this.editBookForm.value.title ?
        { title: this.editBookForm.value.title } :
        {}
      ),
    };
    this.resourceService.request<IBookDTO>(this.book._links.update, updatedBook)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (book) => {
          this.bookResolver.setBook(book);
          this.router.navigate([ '../' ], { relativeTo: this.route });
        },
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
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (authors) => {
          this.authors = authors;
          this.editBookForm.patchValue({
            authors: authors
              .filter((author) => this.book.authors.indexOf(author.fullName) !== -1)
              .map((author) => author.id),
          });
        },
        (err) => this.toastr.error(err),
      );
  }

  private loadCategories() {
    this.categoryService.getCategories()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (categories) => {
          this.categories = categories;
          this.editBookForm.patchValue({
            categories: categories
              .filter((category) => this.book.categories.indexOf(category.name) !== -1)
              .map((category) => category.id),
          });
        },
        (err) => this.toastr.error(err),
      );
  }

  private loadPublishers() {
    this.publisherService.getPublishers()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (publishers) => {
          this.publishers = publishers;
          this.editBookForm.patchValue({
            publishers: publishers
              .filter((publisher) => this.book.publishers.indexOf(publisher.name) !== -1)
              .map((publisher) => publisher.id),
          });
        },
        (err) => this.toastr.error(err),
      );
  }
}
