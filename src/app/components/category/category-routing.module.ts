import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import {
  CategoryResolver,
  CreateCategoryComponent,
  EditCategoryComponent,
  ListCategoriesComponent,
  ViewCategoryComponent,
} from '.';
import { AuthGuard } from '../../guards/auth-guard.service';

const categoryRoutes: Routes = [
  {
    path: '',
    component: ListCategoriesComponent,
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'create',
    component: CreateCategoryComponent,
    canActivate: [
      AuthGuard,
    ],
  },
  {
    path: ':id',
    component: ViewCategoryComponent,
    resolve: {
      category: CategoryResolver,
    },
    runGuardsAndResolvers: 'always',
  },
  {
    path: ':id/edit',
    component: EditCategoryComponent,
    resolve: {
      category: CategoryResolver,
    },
    runGuardsAndResolvers: 'always',
  },
];

@NgModule({
  imports: [ RouterModule.forChild(categoryRoutes) ],
  exports: [ RouterModule ],
})
export class CategoryRoutingModule { }
