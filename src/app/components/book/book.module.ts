import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  BookRowComponent,
  CreateBookComponent,
  EditBookComponent,
  ListBooksComponent,
  ViewBookComponent,
} from '.';
import { BookRoutingModule } from './book-routing.module';
import { SharedModule } from '../../shared.module';
import { BookResolver } from './guards/book-resolver.service';

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
