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
  },
  {
    path: ':id/edit',
    component: EditPublisherComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(publisherRoutes) ],
  exports: [ RouterModule ]
})
export class PublisherRoutingModule { }
