import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
} from '@angular/router';

import {
  CreateBookComponent,
  EditBookComponent,
  ListBooksComponent,
  ViewBookComponent,
} from '.';
import { BookResolver } from './guards/book-resolver.service';

const bookRoutes: Routes = [
  {
    path: '',
    component: ListBooksComponent,
  },
  {
    path: 'create',
    component: CreateBookComponent,
  },
  {
    path: ':id',
    component: ViewBookComponent,
    resolve: {
      book: BookResolver,
    },
  },
  {
    path: ':id/edit',
    component: EditBookComponent,
    resolve: {
      book: BookResolver,
    },
  },
];

@NgModule({
  imports: [ RouterModule.forChild(bookRoutes) ],
  exports: [ RouterModule ]
})
export class BookRoutingModule { }
