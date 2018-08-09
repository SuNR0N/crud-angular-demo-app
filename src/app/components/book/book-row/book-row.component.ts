import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IBookDTO } from '../../../interfaces/dtos/BookDTO';
import { ConfirmationModalComponent } from '../../common/confirmation-modal/confirmation-modal.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[appBookRow]',
  templateUrl: './book-row.component.html',
  styleUrls: ['./book-row.component.scss']
})
export class BookRowComponent {
  @Input() book: IBookDTO;
  @Output() delete = new EventEmitter<IBookDTO>(null);
  @ViewChild('confirmationText') private confirmationText: TemplateRef<any>;

  constructor(
    private modalService: NgbModal,
    private router: Router,
  ) { }

  editBook() {
    this.router.navigate([ 'books', this.book.id, 'edit' ]);
  }

  showConfirmation() {
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.body = this.confirmationText;
    modalRef.result
      .then(() => this.delete.emit(this.book))
      .catch(() => {});
  }

  viewBook() {
    this.router.navigate([ 'books', this.book.id ]);
  }
}
