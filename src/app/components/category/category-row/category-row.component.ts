import {
  Component,
  Input,
} from '@angular/core';
import { Router } from '@angular/router';

import { ICategoryDTO } from '../../../interfaces/dtos/CategoryDTO';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[appCategoryRow]',
  templateUrl: './category-row.component.html',
  styleUrls: ['./category-row.component.scss']
})
export class CategoryRowComponent {
  @Input() category: ICategoryDTO;

  constructor(private router: Router) { }

  deleteCategory(category: ICategoryDTO) {
    // TODO
  }

  editCategory(category: ICategoryDTO) {
    this.router.navigate([ 'categories', category.id, 'edit' ]);
  }

  viewCategory(category: ICategoryDTO) {
    this.router.navigate([ 'categories', category.id ]);
  }
}
