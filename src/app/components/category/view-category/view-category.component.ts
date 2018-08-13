import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';

import { ResourceService } from '../../../api/resource.service';
import { ICategoryDTO } from '../../../interfaces/dtos/CategoryDTO';
import {
  BaseComponent,
  ConfirmationModalComponent,
} from '../../common';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
})
export class ViewCategoryComponent extends BaseComponent implements OnInit {
  @ViewChild('confirmationText') private confirmationText: TemplateRef<any>;
  public category: ICategoryDTO;

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
    this.category = this.route.snapshot.data['category'];
  }

  editCategory() {
    this.router.navigate([ 'edit' ], { relativeTo: this.route });
  }

  showConfirmation() {
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.body = this.confirmationText;
    modalRef.result
      .then(() => this.deleteCategory())
      .catch(() => {});
  }

  private deleteCategory() {
    this.resourceService.request(this.category._links.delete)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        () => this.router.navigate([ 'categories' ]),
        (err) => this.toastr.error(err),
      );
  }
}
