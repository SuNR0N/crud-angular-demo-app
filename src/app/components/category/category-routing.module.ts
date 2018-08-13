import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import {
  CategoryResolver,
  CreateCategoryComponent,
  EditCategoryComponent,
  ListCategoriesComponent,
  ViewCategoryComponent,
} from '.';

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
  exports: [ RouterModule ],
})
export class CategoryRoutingModule { }
