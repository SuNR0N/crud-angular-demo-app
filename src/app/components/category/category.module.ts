import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { ViewCategoryComponent } from './view-category/view-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CommonComponentsModule } from '../common/common-components.module';
import { CategoryRowComponent } from './category-row/category-row.component';

@NgModule({
  imports: [
    CommonModule,
    CategoryRoutingModule,
    CommonComponentsModule,
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
