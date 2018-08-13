import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
} from '@angular/router';

import {
  CreatePublisherComponent,
  EditPublisherComponent,
  ListPublishersComponent,
  ViewPublisherComponent,
} from '.';
import { PublisherResolver } from './guards/publisher-resolver.service';

const publisherRoutes: Routes = [
  {
    path: '',
    component: ListPublishersComponent,
  },
  {
    path: 'create',
    component: CreatePublisherComponent,
  },
  {
    path: ':id',
    component: ViewPublisherComponent,
    resolve: {
      publisher: PublisherResolver,
    },
  },
  {
    path: ':id/edit',
    component: EditPublisherComponent,
    resolve: {
      publisher: PublisherResolver,
    },
  },
];

@NgModule({
  imports: [ RouterModule.forChild(publisherRoutes) ],
  exports: [ RouterModule ]
})
export class PublisherRoutingModule { }
