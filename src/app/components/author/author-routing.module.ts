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
  },
  {
    path: ':id/edit',
    component: EditAuthorComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(authorRoutes) ],
  exports: [ RouterModule ]
})
export class AuthorRoutingModule { }
