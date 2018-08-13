import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
} from '@angular/router';
import {
  map,
  tap,
} from 'rxjs/operators';

import { AuthorService } from '../../../api/author.service';
import { IAuthorDTO } from '../../../interfaces/dtos/AuthorDTO';
import { ProfileService } from '../../../services/profile.service';

@Injectable()
export class AuthorResolver implements Resolve<IAuthorDTO> {
  private author: IAuthorDTO;

  constructor(
    private authorService: AuthorService,
    private profileService: ProfileService,
    private router: Router,
  ) {
    this.init();
  }

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
      this.router.navigate([ 'authors', route.params.id ]);
      return null;
    } else {
      return author;
    }
  }

  private init() {
    this.profileService.getProfile()
      .subscribe((profile) => {
        if (!profile) {
          this.author = null;
        }
      });
  }
}
