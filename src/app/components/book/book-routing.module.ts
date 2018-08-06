import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
} from '@angular/router';

import { ListBooksComponent } from './list-books/list-books.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { ViewBookComponent } from './view-book/view-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';

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
  },
  {
    path: ':id/edit',
    component: EditBookComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(bookRoutes) ],
  exports: [ RouterModule ]
})
export class BookRoutingModule { }
