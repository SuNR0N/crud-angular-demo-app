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
import { AuthGuard } from '../../guards/auth-guard.service';

const bookRoutes: Routes = [
  {
    path: '',
    component: ListBooksComponent,
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'create',
    component: CreateBookComponent,
    canActivate: [
      AuthGuard,
    ],
  },
  {
    path: ':id',
    component: ViewBookComponent,
    resolve: {
      book: BookResolver,
    },
    runGuardsAndResolvers: 'always',
  },
  {
    path: ':id/edit',
    component: EditBookComponent,
    resolve: {
      book: BookResolver,
    },
    runGuardsAndResolvers: 'always',
  },
];

@NgModule({
  imports: [ RouterModule.forChild(bookRoutes) ],
  exports: [ RouterModule ],
})
export class BookRoutingModule { }
