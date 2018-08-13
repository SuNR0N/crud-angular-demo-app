import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAuthorDTO } from '../../../interfaces/dtos/AuthorDTO';
import { ConfirmationModalComponent } from '../../common/confirmation-modal/confirmation-modal.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[appAuthorRow]',
  templateUrl: './author-row.component.html',
})
export class AuthorRowComponent {
  @Input() author: IAuthorDTO;
  @Output() delete = new EventEmitter<IAuthorDTO>(null);
  @ViewChild('confirmationText') private confirmationText: TemplateRef<any>;

  constructor(
    private modalService: NgbModal,
    private router: Router,
  ) { }

  editAuthor() {
    this.router.navigate([ 'authors', this.author.id, 'edit' ]);
  }

  showConfirmation() {
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.body = this.confirmationText;
    modalRef.result
      .then(() => this.delete.emit(this.author))
      .catch(() => {});
  }

  viewAuthor() {
    this.router.navigate([ 'authors', this.author.id ]);
  }
}
