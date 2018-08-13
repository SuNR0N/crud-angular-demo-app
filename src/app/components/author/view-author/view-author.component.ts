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

import { IAuthorDTO } from '../../../interfaces/dtos/AuthorDTO';
import { ResourceService } from '../../../api/resource.service';
import {
  BaseComponent,
  ConfirmationModalComponent,
} from '../../common';

@Component({
  selector: 'app-view-author',
  templateUrl: './view-author.component.html',
})
export class ViewAuthorComponent extends BaseComponent implements OnInit {
  @ViewChild('confirmationText') private confirmationText: TemplateRef<any>;
  public author: IAuthorDTO;

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
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        () => this.router.navigate([ 'authors' ]),
        (err) => this.toastr.error(err),
      );
  }
}
