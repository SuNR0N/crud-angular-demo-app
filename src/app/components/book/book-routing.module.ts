import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import {
  BookResolver,
  CreateBookComponent,
  EditBookComponent,
  ListBooksComponent,
  ViewBookComponent,
} from '.';

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
  exports: [ RouterModule ],
})
export class BookRoutingModule { }
