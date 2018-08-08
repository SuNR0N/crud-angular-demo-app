import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
} from '@angular/router';

import {
  CreateCategoryComponent,
  EditCategoryComponent,
  ListCategoriesComponent,
  ViewCategoryComponent,
} from '.';
import { CategoryResolve } from './category.resolve';

const categoryRoutes: Routes = [
  {
    path: '',
    component: ListCategoriesComponent,
  },
  {
    path: 'create',
    component: CreateCategoryComponent,
  },
  {
    path: ':id',
    component: ViewCategoryComponent,
    resolve: {
      category: CategoryResolve,
    },
  },
  {
    path: ':id/edit',
    component: EditCategoryComponent,
    resolve: {
      category: CategoryResolve,
    },
  },
];

@NgModule({
  imports: [ RouterModule.forChild(categoryRoutes) ],
  exports: [ RouterModule ]
})
export class CategoryRoutingModule { }
