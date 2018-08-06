import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorRoutingModule } from './author-routing.module';
import { ListAuthorsComponent } from './list-authors/list-authors.component';
import { ViewAuthorComponent } from './view-author/view-author.component';
import { EditAuthorComponent } from './edit-author/edit-author.component';
import { CreateAuthorComponent } from './create-author/create-author.component';

@NgModule({
  imports: [
    CommonModule,
    AuthorRoutingModule,
  ],
  declarations: [
    CreateAuthorComponent,
    EditAuthorComponent,
    ListAuthorsComponent,
    ViewAuthorComponent,
  ]
})
export class AuthorModule { }
