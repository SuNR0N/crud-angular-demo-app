import {
  Component,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  ParamMap,
  Router,
} from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { PublisherService } from '../../../api/publisher.service';
import { IPublisherDTO } from '../../../interfaces/dtos/PublisherDTO';

@Component({
  selector: 'app-view-publisher',
  templateUrl: './view-publisher.component.html',
  styleUrls: ['./view-publisher.component.scss']
})
export class ViewPublisherComponent implements OnInit {
  publisher: IPublisherDTO;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private publisherService: PublisherService,
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.publisherService.getPublisher(Number(params.get('id'))))
    ).subscribe((publisher) => this.publisher = publisher);
  }

  deletePublisher() {
    // TODO
  }

  editPublisher(publisher: IPublisherDTO) {
    this.router.navigate([ 'edit' ], { relativeTo: this.route });
  }
}
