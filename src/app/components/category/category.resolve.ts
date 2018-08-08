import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { tap } from 'rxjs/operators';

import { ICategoryDTO } from '../../interfaces/dtos/CategoryDTO';
import { CategoryService } from '../../api/category.service';

@Injectable()
export class CategoryResolve implements Resolve<ICategoryDTO> {
  private category: ICategoryDTO;

  constructor(private categoryService: CategoryService) { }

  setCategory(category: ICategoryDTO) {
    this.category = category;
  }

  resolve(route: ActivatedRouteSnapshot) {
    const id = Number(route.paramMap.get('id'));
    if (this.category && this.category.id === id) {
      return this.category;
    } else {
      return this.categoryService.getCategory(id).pipe(
        tap((category) => this.category = category),
      );
    }
  }
}
