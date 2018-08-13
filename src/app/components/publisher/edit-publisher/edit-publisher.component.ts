import { Location } from '@angular/common';
import {
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';

import { ResourceService } from '../../../api/resource.service';
import {
  INewPublisherDTO,
  IPublisherDTO,
} from '../../../interfaces/dtos';
import { BaseComponent } from '../../common/base/base.component';
import { PublisherResolver } from '../guards/publisher-resolver.service';

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
    this.initialiseRouterEvents();
  }

  ngOnInit() {
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

  private initialiseRouterEvents() {
    this.router.events
      .pipe(takeUntil(this.destroyed$))
      .subscribe((e: any) => {
        if (e instanceof NavigationEnd) {
          this.publisher = this.route.snapshot.data['publisher'];
        }
      });
  }
}
