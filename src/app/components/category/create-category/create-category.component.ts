import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { CategoryService } from '../../../api/category.service';
import { INewCategoryDTO } from '../../../interfaces/dtos/NewCategoryDTO';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
})
export class CreateCategoryComponent {
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
  ) { }

  listCategories() {
    this.router.navigate([ 'categories' ]);
  }

  onSubmit() {
    const newCategory: INewCategoryDTO = {
      ...this.createCategoryForm.value,
    };
    this.categoryService.createCategory(newCategory)
      .subscribe(
        () => this.router.navigate([ 'categories' ]),
        (err) => this.toastr.error(err),
      );
  }
}
