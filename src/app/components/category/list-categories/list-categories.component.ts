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

import { ICategoryDTO } from '../../../interfaces/dtos/CategoryDTO';
import { CategoryService } from '../../../api/category.service';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent implements OnInit {
  public categories: ICategoryDTO[] = [];
  private searchTerm = new Subject<string>();

  constructor(
    private categoryService: CategoryService,
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getCategories();
    this.searchTerm.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term: string) => this.categoryService.getCategories(term)),
    ).subscribe((categories) => this.categories = categories);
  }

  createCategory() {
    this.router.navigate([ 'create' ], { relativeTo: this.route });
  }

  getCategories(query?: string) {
    this.categoryService.getCategories(query)
      .subscribe((categories) => this.categories = categories);
  }

  onSearchTextChange(text: string) {
    this.searchTerm.next(text);
  }

  get profile$() {
    return this.profileService.getProfile();
  }
}
