import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';

import { PublisherService } from '../../../api/publisher.service';
import { INewPublisherDTO } from '../../../interfaces/dtos/NewPublisherDTO';
import { BaseComponent } from '../../common/base/base.component';

@Component({
  selector: 'app-create-publisher',
  templateUrl: './create-publisher.component.html',
})
export class CreatePublisherComponent extends BaseComponent {
  public createPublisherForm = this.fb.group({
    name: [
      '',
      Validators.required,
    ],
  });

  constructor(
    private fb: FormBuilder,
    private publisherService: PublisherService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    super();
  }

  listPublishers() {
    this.router.navigate([ 'publishers' ]);
  }

  onSubmit() {
    const newPublisher: INewPublisherDTO = {
      ...this.createPublisherForm.value,
    };
    this.publisherService.createPublisher(newPublisher)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        () => this.router.navigate([ 'publishers' ]),
        (err) => this.toastr.error(err),
      );
  }
}
