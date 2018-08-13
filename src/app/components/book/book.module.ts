import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  BookResolver,
  BookRowComponent,
  CreateBookComponent,
  EditBookComponent,
  ListBooksComponent,
  ViewBookComponent,
} from '.';
import { SharedModule } from '../../shared.module';
import { BookRoutingModule } from './book-routing.module';

@NgModule({
  imports: [
    CommonModule,
    BookRoutingModule,
    SharedModule,
  ],
  declarations: [
    BookRowComponent,
    CreateBookComponent,
    EditBookComponent,
    ListBooksComponent,
    ViewBookComponent,
  ],
  providers: [
    BookResolver,
  ],
})
export class BookModule { }
