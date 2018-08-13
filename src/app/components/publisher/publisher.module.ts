import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  CreatePublisherComponent,
  EditPublisherComponent,
  ListPublishersComponent,
  PublisherResolver,
  PublisherRowComponent,
  ViewPublisherComponent,
} from '.';
import { SharedModule } from '../../shared.module';
import { PublisherRoutingModule } from './publisher-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PublisherRoutingModule,
    SharedModule,
  ],
  declarations: [
    CreatePublisherComponent,
    EditPublisherComponent,
    ListPublishersComponent,
    PublisherRowComponent,
    ViewPublisherComponent,
  ],
  providers: [
    PublisherResolver,
  ],
})
export class PublisherModule { }
