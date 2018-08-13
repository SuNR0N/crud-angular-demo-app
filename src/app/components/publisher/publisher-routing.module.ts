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
  exports: [ RouterModule ],
})
export class PublisherRoutingModule { }
