import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorRoutingModule } from './author-routing.module';
import { ListAuthorsComponent } from './list-authors/list-authors.component';
import { ViewAuthorComponent } from './view-author/view-author.component';
import { EditAuthorComponent } from './edit-author/edit-author.component';
import { CreateAuthorComponent } from './create-author/create-author.component';
import { CommonComponentsModule } from '../common/common-components.module';
import { AuthorRowComponent } from './author-row/author-row.component';

@NgModule({
  imports: [
    CommonModule,
    AuthorRoutingModule,
    CommonComponentsModule,
  ],
  declarations: [
    AuthorRowComponent,
    CreateAuthorComponent,
    EditAuthorComponent,
    ListAuthorsComponent,
    ViewAuthorComponent,
  ]
})
export class AuthorModule { }
