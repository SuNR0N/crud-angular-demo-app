import {
  Component,
  Input,
} from '@angular/core';
import { Router } from '@angular/router';

import { IPublisherDTO } from '../../../interfaces/dtos/PublisherDTO';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[appPublisherRow]',
  templateUrl: './publisher-row.component.html',
  styleUrls: ['./publisher-row.component.scss']
})
export class PublisherRowComponent {
  @Input() publisher: IPublisherDTO;

  constructor(private router: Router) { }

  deletePublisher(publisher: IPublisherDTO) {
    // TODO
  }

  editPublisher(publisher: IPublisherDTO) {
    this.router.navigate([ 'publishers', publisher.id, 'edit' ]);
  }

  viewPublisher(publisher: IPublisherDTO) {
    this.router.navigate([ 'publishers', publisher.id ]);
  }
}
