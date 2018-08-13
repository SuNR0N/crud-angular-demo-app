import {
  Component,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
import { Location } from '@angular/common';
import {
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';

import {
  IPublisherDTO,
  INewPublisherDTO,
} from '../../../interfaces/dtos';
import { PublisherResolver } from '../guards/publisher-resolver.service';
import { ResourceService } from '../../../api/resource.service';
import { BaseComponent } from '../../common/base/base.component';

@Component({
  selector: 'app-edit-publisher',
  templateUrl: './edit-publisher.component.html',
})
export class EditPublisherComponent extends BaseComponent implements OnInit {
  public publisher: IPublisherDTO;
  public editPublisherForm = this.fb.group({
    name: [
      '',
      Validators.required,
    ],
  });

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private publisherResolver: PublisherResolver,
    private resourceService: ResourceService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) {
    super();
  }

  ngOnInit() {
    this.publisher = this.route.snapshot.data['publisher'];
    this.editPublisherForm.setValue({
      name: this.publisher.name,
    });
  }

  cancel() {
    this.location.back();
  }

  onSubmit() {
    const updatedPublisher: INewPublisherDTO = {
      ...this.editPublisherForm.value,
    };
    this.resourceService.request<IPublisherDTO>(this.publisher._links.update, updatedPublisher)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (publisher) => {
          this.publisherResolver.setPublisher(publisher);
          this.router.navigate([ '../' ], { relativeTo: this.route });
        },
        (err) => this.toastr.error(err),
      );
  }
}
