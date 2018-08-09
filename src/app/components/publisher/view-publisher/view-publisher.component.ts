import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPublisherDTO } from '../../../interfaces/dtos/PublisherDTO';
import { ResourceService } from '../../../api/resource.service';
import { ConfirmationModalComponent } from '../../common/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-view-publisher',
  templateUrl: './view-publisher.component.html',
  styleUrls: ['./view-publisher.component.scss']
})
export class ViewPublisherComponent implements OnInit {
  @ViewChild('confirmationText') private confirmationText: TemplateRef<any>;
  public publisher: IPublisherDTO;

  constructor(
    private modalService: NgbModal,
    private resourceService: ResourceService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.publisher = this.route.snapshot.data['publisher'];
  }

  editPublisher() {
    this.router.navigate([ 'edit' ], { relativeTo: this.route });
  }

  showConfirmation() {
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.body = this.confirmationText;
    modalRef.result
      .then(() => this.deletePublisher())
      .catch(() => {});
  }

  private deletePublisher() {
    this.resourceService.request(this.publisher._links.delete)
      .subscribe(() => this.router.navigate([ 'publishers' ]));
  }
}
