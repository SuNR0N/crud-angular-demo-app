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

import { IPublisherDTO } from '../../../interfaces/dtos/PublisherDTO';
import { ConfirmationModalComponent } from '../../common/confirmation-modal/confirmation-modal.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[appPublisherRow]',
  templateUrl: './publisher-row.component.html',
})
export class PublisherRowComponent {
  @Input() publisher: IPublisherDTO;
  @Output() delete = new EventEmitter<IPublisherDTO>(null);
  @ViewChild('confirmationText') private confirmationText: TemplateRef<any>;

  constructor(
    private modalService: NgbModal,
    private router: Router,
  ) { }

  editPublisher() {
    this.router.navigate([ 'publishers', this.publisher.id, 'edit' ]);
  }

  showConfirmation() {
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.body = this.confirmationText;
    modalRef.result
      .then(() => this.delete.emit(this.publisher))
      .catch(() => {});
  }

  viewPublisher() {
    this.router.navigate([ 'publishers', this.publisher.id ]);
  }
}
