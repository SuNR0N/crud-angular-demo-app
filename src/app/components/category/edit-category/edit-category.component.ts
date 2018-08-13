import { Location } from '@angular/common';
import {
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';

import { ResourceService } from '../../../api/resource.service';
import {
  ICategoryDTO,
  INewCategoryDTO,
} from '../../../interfaces/dtos';
import { BaseComponent } from '../../common/base/base.component';
import { CategoryResolver } from '../guards/category-resolver.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
})
export class EditCategoryComponent extends BaseComponent implements OnInit {
  public category: ICategoryDTO;
  public editCategoryForm = this.fb.group({
    name: [
      '',
      Validators.required,
    ],
  });

  constructor(
    private categoryResolver: CategoryResolver,
    private fb: FormBuilder,
    private location: Location,
    private resourceService: ResourceService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) {
    super();
    this.initialiseRouterEvents();
  }

  ngOnInit() {
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
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (category) => {
          this.categoryResolver.setCategory(category);
          this.router.navigate([ '../' ], { relativeTo: this.route });
        },
        (err) => this.toastr.error(err),
      );
  }

  private initialiseRouterEvents() {
    this.router.events
      .pipe(takeUntil(this.destroyed$))
      .subscribe((e: any) => {
        if (e instanceof NavigationEnd) {
          this.category = this.route.snapshot.data['category'];
        }
      });
  }
}
