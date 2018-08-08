import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  CreatePublisherComponent,
  EditPublisherComponent,
  ListPublishersComponent,
  PublisherRowComponent,
  ViewPublisherComponent,
} from '.';
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
})
export class PublisherModule { }
