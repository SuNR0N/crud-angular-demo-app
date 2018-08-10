import {
  Component,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';
import {
  Router,
  ActivatedRoute,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ICategoryDTO } from '../../../interfaces/dtos/CategoryDTO';
import { ProfileService } from '../../../services/profile.service';
import {
  CategoryService,
  ResourceService,
} from '../../../api';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
})
export class ListCategoriesComponent implements OnInit {
  public categories: ICategoryDTO[] = [];
  private searchTerm = new Subject<string>();

  constructor(
    private categoryService: CategoryService,
    private profileService: ProfileService,
    private resourceService: ResourceService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.getCategories();
    this.searchTerm.pipe(
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

  get profile$() {
    return this.profileService.getProfile();
  }

  private getCategories(query?: string) {
    this.categoryService.getCategories(query)
      .subscribe(
        (categories) => this.categories = categories,
        (err) => this.toastr.error(err),
      );
  }
}
