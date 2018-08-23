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
import { AuthGuard } from '../../guards/auth-guard.service';

export const authorRoutes: Routes = [
  {
    path: '',
    component: ListAuthorsComponent,
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'create',
    component: CreateAuthorComponent,
    canActivate: [
      AuthGuard,
    ],
  },
  {
    path: ':id',
    component: ViewAuthorComponent,
    resolve: {
      author: AuthorResolver,
    },
    runGuardsAndResolvers: 'always',
  },
  {
    path: ':id/edit',
    component: EditAuthorComponent,
    resolve: {
      author: AuthorResolver,
    },
    runGuardsAndResolvers: 'always',
  },
];

@NgModule({
  imports: [ RouterModule.forChild(authorRoutes) ],
  exports: [ RouterModule ],
})
export class AuthorRoutingModule { }
