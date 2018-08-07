import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { ListBooksComponent } from './list-books/list-books.component';
import { ViewBookComponent } from './view-book/view-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { BookRowComponent } from './book-row/book-row.component';
import { CommonComponentsModule } from '../common/common-components.module';

@NgModule({
  imports: [
    CommonModule,
    BookRoutingModule,
    CommonComponentsModule,
  ],
  declarations: [
    BookRowComponent,
    CreateBookComponent,
    EditBookComponent,
    ListBooksComponent,
    ViewBookComponent,
  ],
})
export class BookModule { }
