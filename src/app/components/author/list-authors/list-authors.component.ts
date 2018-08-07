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

import { IAuthorDTO } from '../../../interfaces/dtos/AuthorDTO';
import { AuthorService } from '../../../api/author.service';

@Component({
  selector: 'app-list-authors',
  templateUrl: './list-authors.component.html',
  styleUrls: ['./list-authors.component.scss']
})
export class ListAuthorsComponent implements OnInit {
  public authors: IAuthorDTO[] = [];
  private searchTerm = new Subject<string>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authorService: AuthorService,
  ) { }

  ngOnInit() {
    this.getAuthors();
    this.searchTerm.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term: string) => this.authorService.getAuthors(term)),
    ).subscribe((authors) => this.authors = authors);
  }

  createAuthor() {
    this.router.navigate([ 'create' ], { relativeTo: this.route });
  }

  getAuthors(query?: string) {
    this.authorService.getAuthors(query)
      .subscribe((authors) => this.authors = authors);
  }

  onSearchTextChange(text: string) {
    this.searchTerm.next(text);
  }
}
