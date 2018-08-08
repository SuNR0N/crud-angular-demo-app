import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  CreatePublisherComponent,
  EditPublisherComponent,
  ListPublishersComponent,
  PublisherRowComponent,
  ViewPublisherComponent,
} from '.';
import { PublisherResolve } from './publisher.resolve';
import { PublisherRoutingModule } from './publisher-routing.module';
import { SharedModule } from '../../shared.module';

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
    PublisherResolve,
  ],
})
export class PublisherModule { }
