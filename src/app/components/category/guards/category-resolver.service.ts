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

import { CategoryService } from '../../../api/category.service';
import { ICategoryDTO } from '../../../interfaces/dtos/CategoryDTO';

@Injectable()
export class CategoryResolver implements Resolve<ICategoryDTO> {
  private category: ICategoryDTO;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
  ) { }

  setCategory(category: ICategoryDTO) {
    this.category = category;
  }

  resolve(route: ActivatedRouteSnapshot) {
    const id = Number(route.paramMap.get('id'));
    if (this.category && this.category.id === id) {
      return this.actionMapper(route, this.category);
    } else {
      return this.categoryService.getCategory(id).pipe(
        tap((category) => this.category = category),
        map((category) => this.actionMapper(route, category)),
      );
    }
  }

  private actionMapper(route: ActivatedRouteSnapshot, category: ICategoryDTO) {
    if (route.routeConfig.path.match(/edit$/) && category._links.update === undefined) {
      this.router.navigate([ '/categories' ]);
      return null;
    } else {
      return category;
    }
  }
}
