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

import {
  BookService,
  ResourceService,
} from '../../../api';
import { IBookDTO } from '../../../interfaces/dtos/BookDTO';
import { ConfirmationModalComponent } from '../../common/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
})
export class ViewBookComponent implements OnInit {
  @ViewChild('confirmationText') private confirmationText: TemplateRef<any>;
  book: IBookDTO;

  constructor(
    private modalService: NgbModal,
    private resourceService: ResourceService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

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
      .subscribe(() => this.router.navigate([ 'books' ]));
  }
}
