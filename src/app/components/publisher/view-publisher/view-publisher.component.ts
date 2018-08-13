import {
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
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
export class ViewPublisherComponent extends BaseComponent {
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
    this.initialiseRouterEvents();
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

  private initialiseRouterEvents() {
    this.router.events
      .pipe(takeUntil(this.destroyed$))
      .subscribe((e: any) => {
        if (e instanceof NavigationEnd) {
          this.publisher = this.route.snapshot.data['publisher'];
        }
      });
  }
}
