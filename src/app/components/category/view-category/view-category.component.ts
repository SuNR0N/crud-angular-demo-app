import {
  Component,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  ParamMap,
  Router,
} from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { CategoryService } from '../../../api/category.service';
import { ICategoryDTO } from '../../../interfaces/dtos/CategoryDTO';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss']
})
export class ViewCategoryComponent implements OnInit {
  category: ICategoryDTO;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.categoryService.getCategory(Number(params.get('id'))))
    ).subscribe((category) => this.category = category);
  }

  deleteCategory() {
    // TODO
  }

  editCategory(category: ICategoryDTO) {
    this.router.navigate([ 'edit' ], { relativeTo: this.route });
  }
}
