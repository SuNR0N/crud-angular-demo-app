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
import { CategoryResolver } from './guards/category-resolver.service';

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
      category: CategoryResolver,
    },
  },
  {
    path: ':id/edit',
    component: EditCategoryComponent,
    resolve: {
      category: CategoryResolver,
    },
  },
];

@NgModule({
  imports: [ RouterModule.forChild(categoryRoutes) ],
  exports: [ RouterModule ]
})
export class CategoryRoutingModule { }
