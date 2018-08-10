import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { PublisherService } from '../../../api/publisher.service';
import { INewPublisherDTO } from '../../../interfaces/dtos/NewPublisherDTO';

@Component({
  selector: 'app-create-publisher',
  templateUrl: './create-publisher.component.html',
})
export class CreatePublisherComponent {
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
  ) { }

  listPublishers() {
    this.router.navigate([ 'publishers' ]);
  }

  onSubmit() {
    const newPublisher: INewPublisherDTO = {
      ...this.createPublisherForm.value,
    };
    this.publisherService.createPublisher(newPublisher)
      .subscribe(() => this.router.navigate([ 'publishers' ]));
  }
}
