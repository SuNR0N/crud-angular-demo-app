import {
  Component,
  Input,
} from '@angular/core';
import { Router } from '@angular/router';

import { IAuthorDTO } from '../../../interfaces/dtos/AuthorDTO';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[appAuthorRow]',
  templateUrl: './author-row.component.html',
  styleUrls: ['./author-row.component.scss']
})
export class AuthorRowComponent {
  @Input() author: IAuthorDTO;

  constructor(private router: Router) { }

  deleteAuthor(author: IAuthorDTO) {
    // TODO
  }

  editAuthor(author: IAuthorDTO) {
    this.router.navigate([ 'authors', author.id, 'edit' ]);
  }

  viewAuthor(author: IAuthorDTO) {
    this.router.navigate([ 'authors', author.id ]);
  }
}
