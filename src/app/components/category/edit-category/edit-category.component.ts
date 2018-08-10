import {
  Component,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
import { Location } from '@angular/common';
import {
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import {
  ICategoryDTO,
  INewCategoryDTO,
} from '../../../interfaces/dtos';
import { CategoryResolve } from '../category.resolve';
import { ResourceService } from '../../../api/resource.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
})
export class EditCategoryComponent implements OnInit {
  public category: ICategoryDTO;
  public editCategoryForm = this.fb.group({
    name: [
      '',
      Validators.required,
    ],
  });

  constructor(
    private categoryResolve: CategoryResolve,
    private fb: FormBuilder,
    private location: Location,
    private resourceService: ResourceService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.category = this.route.snapshot.data['category'];
    this.editCategoryForm.setValue({
      name: this.category.name,
    });
  }

  cancel() {
    this.location.back();
  }

  onSubmit() {
    const updatedCategory: INewCategoryDTO = {
      ...this.editCategoryForm.value,
    };
    this.resourceService.request<ICategoryDTO>(this.category._links.update, updatedCategory)
      .subscribe(
        (category) => {
          this.categoryResolve.setCategory(category);
          this.router.navigate([ '../' ], { relativeTo: this.route });
        },
        (err) => this.toastr.error(err),
      );
  }
}
