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
  },
  {
    path: ':id/edit',
    component: EditCategoryComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(categoryRoutes) ],
  exports: [ RouterModule ]
})
export class CategoryRoutingModule { }
