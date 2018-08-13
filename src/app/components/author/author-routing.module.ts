import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import {
  AuthorResolver,
  CreateAuthorComponent,
  EditAuthorComponent,
  ListAuthorsComponent,
  ViewAuthorComponent,
} from '.';

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
  exports: [ RouterModule ],
})
export class AuthorRoutingModule { }
