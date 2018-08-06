import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
} from '@angular/router';

import { ListAuthorsComponent } from './list-authors/list-authors.component';
import { CreateAuthorComponent } from './create-author/create-author.component';
import { ViewAuthorComponent } from './view-author/view-author.component';
import { EditAuthorComponent } from './edit-author/edit-author.component';

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
