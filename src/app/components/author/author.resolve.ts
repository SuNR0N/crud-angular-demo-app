import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { tap } from 'rxjs/operators';

import { IAuthorDTO } from '../../interfaces/dtos/AuthorDTO';
import { AuthorService } from '../../api/author.service';

@Injectable()
export class AuthorResolve implements Resolve<IAuthorDTO> {
  private author: IAuthorDTO;

  constructor(private authorService: AuthorService) {}

  setAuthor(author: IAuthorDTO) {
    this.author = author;
  }

  resolve(route: ActivatedRouteSnapshot) {
    const id = Number(route.paramMap.get('id'));
    if (this.author && this.author.id === id) {
      return this.author;
    } else {
      return this.authorService.getAuthor(id).pipe(
        tap((author) => this.author = author),
      );
    }
  }
}
