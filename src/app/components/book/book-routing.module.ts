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
import { BookResolve } from './book.resolve';

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
      book: BookResolve,
    },
  },
  {
    path: ':id/edit',
    component: EditBookComponent,
    resolve: {
      book: BookResolve,
    },
  },
];

@NgModule({
  imports: [ RouterModule.forChild(bookRoutes) ],
  exports: [ RouterModule ]
})
export class BookRoutingModule { }
