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
