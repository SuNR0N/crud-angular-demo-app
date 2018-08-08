import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  CategoryRowComponent,
  CreateCategoryComponent,
  EditCategoryComponent,
  ListCategoriesComponent,
  ViewCategoryComponent,
} from '.';
import { CategoryRoutingModule } from './category-routing.module';
import { SharedModule } from '../../shared.module';

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
})
export class CategoryModule { }
