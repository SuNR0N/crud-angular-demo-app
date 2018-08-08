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
import { AuthorResolve } from './author.resolve';

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
      author: AuthorResolve,
    },
  },
  {
    path: ':id/edit',
    component: EditAuthorComponent,
    resolve: {
      author: AuthorResolve,
    },
  },
];

@NgModule({
  imports: [ RouterModule.forChild(authorRoutes) ],
  exports: [ RouterModule ]
})
export class AuthorRoutingModule { }
