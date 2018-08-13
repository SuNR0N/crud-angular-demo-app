import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';

import { CategoryService } from '../../../api/category.service';
import { INewCategoryDTO } from '../../../interfaces/dtos/NewCategoryDTO';
import { BaseComponent } from '../../common/base/base.component';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
})
export class CreateCategoryComponent extends BaseComponent {
  public createCategoryForm = this.fb.group({
    name: [
      '',
      Validators.required,
    ],
  });

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
  ) {
    super();
  }

  listCategories() {
    this.router.navigate([ 'categories' ]);
  }

  onSubmit() {
    const newCategory: INewCategoryDTO = {
      ...this.createCategoryForm.value,
    };
    this.categoryService.createCategory(newCategory)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        () => this.router.navigate([ 'categories' ]),
        (err) => this.toastr.error(err),
      );
  }
}
