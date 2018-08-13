import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AuthorRowComponent,
  CreateAuthorComponent,
  EditAuthorComponent,
  ListAuthorsComponent,
  ViewAuthorComponent,
} from '.';
import { AuthorResolver } from './guards/author-resolver.service';
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
    AuthorResolver,
  ],
})
export class AuthorModule { }
