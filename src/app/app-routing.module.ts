import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/books',
    pathMatch: 'full',
  },
  {
    path: 'authors',
    loadChildren: './components/author/author.module#AuthorModule',
  },
  {
    path: 'books',
    loadChildren: './components/book/book.module#BookModule',
  },
  {
    path: 'categories',
    loadChildren: './components/category/category.module#CategoryModule',
  },
  {
    path: 'publishers',
    loadChildren: './components/publisher/publisher.module#PublisherModule',
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {}
