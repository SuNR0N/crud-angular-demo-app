import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  AuthorResolver,
  AuthorRowComponent,
  CreateAuthorComponent,
  EditAuthorComponent,
  ListAuthorsComponent,
  ViewAuthorComponent,
} from '.';
import { SharedModule } from '../../shared.module';
import { AuthorRoutingModule } from './author-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AuthorRoutingModule,
    SharedModule,
  ],
  declarations: [
    AuthorRowComponent,
    CreateAuthorComponent,
    EditAuthorComponent,
    ListAuthorsComponent,
    ViewAuthorComponent,
  ],
  providers: [
    AuthorResolver,
  ],
})
export class AuthorModule { }
