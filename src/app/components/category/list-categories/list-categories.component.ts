import {
  Component,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import {
  Router,
  ActivatedRoute,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ICategoryDTO } from '../../../interfaces/dtos/CategoryDTO';
import {
  ProfileService,
  SpinnerService,
} from '../../../services';
import {
  CategoryService,
  ResourceService,
} from '../../../api';
import { BaseComponent } from '../../common/base/base.component';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
})
export class ListCategoriesComponent extends BaseComponent implements OnInit {
  public categories: ICategoryDTO[] = [];
  public queryString: string;
  private searchTerm = new Subject<string>();

  constructor(
    private categoryService: CategoryService,
    private profileService: ProfileService,
    private resourceService: ResourceService,
    private route: ActivatedRoute,
    private router: Router,
    private spinnerService: SpinnerService,
    private toastr: ToastrService,
  ) {
    super();
  }

  ngOnInit() {
    this.queryString = this.route.snapshot.queryParamMap.get('q');
    this.getCategories(this.queryString);
    this.searchTerm.pipe(
      takeUntil(this.destroyed$),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term: string) => this.categoryService.getCategories(term)),
    ).subscribe(
      (categories) => this.categories = categories,
      (err) => this.toastr.error(err),
    );
  }

  createCategory() {
    this.router.navigate([ 'create' ], { relativeTo: this.route });
  }

  onDelete(category: ICategoryDTO) {
    this.resourceService.request(category._links.delete)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        () => {
          const categoryIndex = this.categories.findIndex((existingCategory) => existingCategory === category);
          if (categoryIndex !== -1) {
            this.categories.splice(categoryIndex, 1);
          }
        },
        (err) => this.toastr.error(err),
      );
  }

  onSearchTextChange(text: string) {
    this.searchTerm.next(text);
  }

  get isLoading() {
    return this.spinnerService.matches(['GET', /\/api\/v1\/categories/]);
  }

  get profile$() {
    return this.profileService.getProfile();
  }

  private getCategories(query?: string) {
    this.categoryService.getCategories(query)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (categories) => this.categories = categories,
        (err) => this.toastr.error(err),
      );
  }
}
