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

import { IPublisherDTO } from '../../../interfaces/dtos/PublisherDTO';
import { ConfirmationModalComponent } from '../../common/confirmation-modal/confirmation-modal.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[appPublisherRow]',
  templateUrl: './publisher-row.component.html',
  styleUrls: ['./publisher-row.component.scss']
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
