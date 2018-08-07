import {
  Component,
  OnInit,
} from '@angular/core';

import { IPublisherDTO } from '../../../interfaces/dtos/PublisherDTO';
import { PublisherService } from '../../../api/publisher.service';

@Component({
  selector: 'app-list-publishers',
  templateUrl: './list-publishers.component.html',
  styleUrls: ['./list-publishers.component.scss']
})
export class ListPublishersComponent implements OnInit {
  publishers: IPublisherDTO[] = [];

  constructor(private publisherService: PublisherService) { }

  ngOnInit() {
    this.getPublishers();
  }

  getPublishers(query?: string) {
    this.publisherService.getPublishers(query)
      .subscribe((publishers) => this.publishers = publishers);
  }
}
