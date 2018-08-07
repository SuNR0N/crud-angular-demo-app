import {
  Component,
  OnInit,
} from '@angular/core';

import { IAuthorDTO } from '../../../interfaces/dtos/AuthorDTO';
import { AuthorService } from '../../../api/author.service';

@Component({
  selector: 'app-list-authors',
  templateUrl: './list-authors.component.html',
  styleUrls: ['./list-authors.component.scss']
})
export class ListAuthorsComponent implements OnInit {
  authors: IAuthorDTO[] = [];

  constructor(private authorService: AuthorService) { }

  ngOnInit() {
    this.getAuthors();
  }

  getAuthors(query?: string) {
    this.authorService.getAuthors(query)
      .subscribe((authors) => this.authors = authors);
  }
}
