import {
  Component,
  OnInit,
} from '@angular/core';

import { ICategoryDTO } from '../../../interfaces/dtos/CategoryDTO';
import { CategoryService } from '../../../api/category.service';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent implements OnInit {
  categories: ICategoryDTO[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(query?: string) {
    this.categoryService.getCategories(query)
      .subscribe((categories) => this.categories = categories);
  }
}
