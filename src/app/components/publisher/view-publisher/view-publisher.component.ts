import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';

import { ResourceService } from '../../../api/resource.service';
import { IPublisherDTO } from '../../../interfaces/dtos/PublisherDTO';
import {
  BaseComponent,
  ConfirmationModalComponent,
} from '../../common';

@Component({
  selector: 'app-view-publisher',
  templateUrl: './view-publisher.component.html',
})
export class ViewPublisherComponent extends BaseComponent implements OnInit {
  @ViewChild('confirmationText') private confirmationText: TemplateRef<any>;
  public publisher: IPublisherDTO;

  constructor(
    private modalService: NgbModal,
    private resourceService: ResourceService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) {
    super();
  }

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
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        () => this.router.navigate([ 'publishers' ]),
        (err) => this.toastr.error(err),
      );
  }
}
