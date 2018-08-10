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

import { ICategoryDTO } from '../../../interfaces/dtos/CategoryDTO';
import { ConfirmationModalComponent } from '../../common/confirmation-modal/confirmation-modal.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[appCategoryRow]',
  templateUrl: './category-row.component.html',
})
export class CategoryRowComponent {
  @Input() category: ICategoryDTO;
  @Output() delete = new EventEmitter<ICategoryDTO>(null);
  @ViewChild('confirmationText') private confirmationText: TemplateRef<any>;

  constructor(
    private modalService: NgbModal,
    private router: Router,
  ) { }

  showConfirmation() {
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.body = this.confirmationText;
    modalRef.result
      .then(() => this.delete.emit(this.category))
      .catch(() => {});
  }

  editCategory() {
    this.router.navigate([ 'categories', this.category.id, 'edit' ]);
  }

  viewCategory() {
    this.router.navigate([ 'categories', this.category.id ]);
  }
}
