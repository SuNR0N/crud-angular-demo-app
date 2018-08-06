import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { ListBooksComponent } from './list-books/list-books.component';
import { ViewBookComponent } from './view-book/view-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { CreateBookComponent } from './create-book/create-book.component';

@NgModule({
  imports: [
    CommonModule,
    BookRoutingModule,
  ],
  declarations: [
    CreateBookComponent,
    EditBookComponent,
    ListBooksComponent,
    ViewBookComponent,
  ],
})
export class BookModule { }
