import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
} from '@angular/router';

import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { ViewCategoryComponent } from './view-category/view-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';

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
