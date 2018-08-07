import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublisherRoutingModule } from './publisher-routing.module';
import { ListPublishersComponent } from './list-publishers/list-publishers.component';
import { ViewPublisherComponent } from './view-publisher/view-publisher.component';
import { EditPublisherComponent } from './edit-publisher/edit-publisher.component';
import { CreatePublisherComponent } from './create-publisher/create-publisher.component';
import { CommonComponentsModule } from '../common/common-components.module';
import { PublisherRowComponent } from './publisher-row/publisher-row.component';

@NgModule({
  imports: [
    CommonComponentsModule,
    CommonModule,
    PublisherRoutingModule,
  ],
  declarations: [
    CreatePublisherComponent,
    EditPublisherComponent,
    ListPublishersComponent,
    PublisherRowComponent,
    ViewPublisherComponent,
  ],
})
export class PublisherModule { }
