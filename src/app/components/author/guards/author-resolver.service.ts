import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import {
  tap,
  map,
} from 'rxjs/operators';

import { IAuthorDTO } from '../../../interfaces/dtos/AuthorDTO';
import { AuthorService } from '../../../api/author.service';

@Injectable()
export class AuthorResolver implements Resolve<IAuthorDTO> {
  private author: IAuthorDTO;

  constructor(
    private authorService: AuthorService,
    private router: Router,
  ) {}

  setAuthor(author: IAuthorDTO) {
    this.author = author;
  }

  resolve(route: ActivatedRouteSnapshot) {
    const id = Number(route.paramMap.get('id'));
    if (this.author && this.author.id === id) {
      return this.actionMapper(route, this.author);
    } else {
      return this.authorService.getAuthor(id).pipe(
        tap((author) => this.author = author),
        map((author) => this.actionMapper(route, author)),
      );
    }
  }

  private actionMapper(route: ActivatedRouteSnapshot, author: IAuthorDTO) {
    if (route.routeConfig.path.match(/edit$/) && author._links.update === undefined) {
      this.router.navigate([ '/authors' ]);
      return null;
    } else {
      return author;
    }
  }
}
