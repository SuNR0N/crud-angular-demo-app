import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import {
  CreatePublisherComponent,
  EditPublisherComponent,
  ListPublishersComponent,
  PublisherResolver,
  ViewPublisherComponent,
} from '.';
import { AuthGuard } from '../../guards/auth-guard.service';

const publisherRoutes: Routes = [
  {
    path: '',
    component: ListPublishersComponent,
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'create',
    component: CreatePublisherComponent,
    canActivate: [
      AuthGuard,
    ],
  },
  {
    path: ':id',
    component: ViewPublisherComponent,
    resolve: {
      publisher: PublisherResolver,
    },
    runGuardsAndResolvers: 'always',
  },
  {
    path: ':id/edit',
    component: EditPublisherComponent,
    resolve: {
      publisher: PublisherResolver,
    },
    runGuardsAndResolvers: 'always',
  },
];

@NgModule({
  imports: [ RouterModule.forChild(publisherRoutes) ],
  exports: [ RouterModule ],
})
export class PublisherRoutingModule { }
