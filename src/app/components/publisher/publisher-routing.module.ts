import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
} from '@angular/router';

import { ListPublishersComponent } from './list-publishers/list-publishers.component';
import { CreatePublisherComponent } from './create-publisher/create-publisher.component';
import { ViewPublisherComponent } from './view-publisher/view-publisher.component';
import { EditPublisherComponent } from './edit-publisher/edit-publisher.component';

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
