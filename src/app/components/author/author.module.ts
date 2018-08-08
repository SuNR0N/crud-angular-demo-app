import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AuthorRowComponent,
  CreateAuthorComponent,
  EditAuthorComponent,
  ListAuthorsComponent,
  ViewAuthorComponent,
} from '.';
import { AuthorResolve } from './author.resolve';
import { AuthorRoutingModule } from './author-routing.module';
import { SharedModule } from '../../shared.module';

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
    AuthorResolve,
  ],
})
export class AuthorModule { }
