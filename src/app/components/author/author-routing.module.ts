import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
} from '@angular/router';

import {
  CreateAuthorComponent,
  EditAuthorComponent,
  ListAuthorsComponent,
  ViewAuthorComponent,
} from '.';
import { AuthorResolver } from './guards/author-resolver.service';

const authorRoutes: Routes = [
  {
    path: '',
    component: ListAuthorsComponent,
  },
  {
    path: 'create',
    component: CreateAuthorComponent,
  },
  {
    path: ':id',
    component: ViewAuthorComponent,
    resolve: {
      author: AuthorResolver,
    },
  },
  {
    path: ':id/edit',
    component: EditAuthorComponent,
    resolve: {
      author: AuthorResolver,
    },
  },
];

@NgModule({
  imports: [ RouterModule.forChild(authorRoutes) ],
  exports: [ RouterModule ]
})
export class AuthorRoutingModule { }
