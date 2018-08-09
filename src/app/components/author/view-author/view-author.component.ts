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

import { IAuthorDTO } from '../../../interfaces/dtos/AuthorDTO';
import { ConfirmationModalComponent } from '../../common/confirmation-modal/confirmation-modal.component';
import { ResourceService } from '../../../api/resource.service';

@Component({
  selector: 'app-view-author',
  templateUrl: './view-author.component.html',
  styleUrls: ['./view-author.component.scss']
})
export class ViewAuthorComponent implements OnInit {
  @ViewChild('confirmationText') private confirmationText: TemplateRef<any>;
  public author: IAuthorDTO;

  constructor(
    private modalService: NgbModal,
    private resourceService: ResourceService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.author = this.route.snapshot.data['author'];
  }

  editAuthor() {
    this.router.navigate([ 'edit' ], { relativeTo: this.route });
  }

  showConfirmation() {
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.body = this.confirmationText;
    modalRef.result
      .then(() => this.deleteAuthor())
      .catch(() => {});
  }

  private deleteAuthor() {
    this.resourceService.request(this.author._links.delete)
      .subscribe(() => this.router.navigate([ 'authors' ]));
  }
}
