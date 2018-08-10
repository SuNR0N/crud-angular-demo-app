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

import {
  IPublisherDTO,
  INewPublisherDTO,
} from '../../../interfaces/dtos';
import { PublisherResolve } from '../publisher.resolve';
import { ResourceService } from '../../../api/resource.service';

@Component({
  selector: 'app-edit-publisher',
  templateUrl: './edit-publisher.component.html',
})
export class EditPublisherComponent implements OnInit {
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
    private publisherResolve: PublisherResolve,
    private resourceService: ResourceService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) { }

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
      .subscribe(
        (publisher) => {
          this.publisherResolve.setPublisher(publisher);
          this.router.navigate([ '../' ], { relativeTo: this.route });
        },
        (err) => this.toastr.error(err),
      );
  }
}
