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
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';

import { ResourceService } from '../../../api/resource.service';
import { IBookDTO } from '../../../interfaces/dtos/BookDTO';
import {
  BaseComponent,
  ConfirmationModalComponent,
} from '../../common';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
})
export class ViewBookComponent extends BaseComponent implements OnInit {
  @ViewChild('confirmationText') private confirmationText: TemplateRef<any>;
  book: IBookDTO;

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
    this.book = this.route.snapshot.data['book'];
  }

  editBook() {
    this.router.navigate([ 'edit' ], { relativeTo: this.route });
  }

  showConfirmation() {
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.body = this.confirmationText;
    modalRef.result
      .then(() => this.deleteBook())
      .catch(() => {});
  }

  private deleteBook() {
    this.resourceService.request(this.book._links.delete)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        () => this.router.navigate([ 'books' ]),
        (err) => this.toastr.error(err),
      );
  }
}
