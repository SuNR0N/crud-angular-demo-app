import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
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
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'books',
    loadChildren: './components/book/book.module#BookModule',
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'categories',
    loadChildren: './components/category/category.module#CategoryModule',
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'publishers',
    loadChildren: './components/publisher/publisher.module#PublisherModule',
    runGuardsAndResolvers: 'always',
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {}
