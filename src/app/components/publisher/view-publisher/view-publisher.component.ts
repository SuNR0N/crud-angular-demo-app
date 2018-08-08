import {
  Component,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import { IPublisherDTO } from '../../../interfaces/dtos/PublisherDTO';

@Component({
  selector: 'app-view-publisher',
  templateUrl: './view-publisher.component.html',
  styleUrls: ['./view-publisher.component.scss']
})
export class ViewPublisherComponent implements OnInit {
  public publisher: IPublisherDTO;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.publisher = this.route.snapshot.data['publisher'];
  }

  deletePublisher() {
    // TODO
  }

  editPublisher(publisher: IPublisherDTO) {
    this.router.navigate([ 'edit' ], { relativeTo: this.route });
  }
}
