import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  CategoryResolver,
  CategoryRowComponent,
  CreateCategoryComponent,
  EditCategoryComponent,
  ListCategoriesComponent,
  ViewCategoryComponent,
} from '.';
import { SharedModule } from '../../shared.module';
import { CategoryRoutingModule } from './category-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CategoryRoutingModule,
    SharedModule,
  ],
  declarations: [
    CategoryRowComponent,
    CreateCategoryComponent,
    EditCategoryComponent,
    ListCategoriesComponent,
    ViewCategoryComponent,
  ],
  providers: [
    CategoryResolver,
  ],
})
export class CategoryModule { }
