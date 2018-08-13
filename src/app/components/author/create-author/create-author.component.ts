import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';

import { AuthorService } from '../../../api/author.service';
import { INewAuthorDTO } from '../../../interfaces/dtos/NewAuthorDTO';
import { BaseComponent } from '../../common/base/base.component';

@Component({
  selector: 'app-create-author',
  templateUrl: './create-author.component.html',
})
export class CreateAuthorComponent extends BaseComponent {
  public createAuthorForm = this.fb.group({
    firstName: [
      '',
      Validators.required,
    ],
    lastName: [
      '',
      Validators.required,
    ],
    middleName: [''],
  });

  constructor(
    private authorSerive: AuthorService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
  ) {
    super();
  }

  listAuthors() {
    this.router.navigate([ 'authors' ]);
  }

  onSubmit() {
    const newAuthor: INewAuthorDTO = {
      ...this.createAuthorForm.value,
    };
    this.authorSerive.createAuthor(newAuthor)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        () => this.router.navigate([ 'authors' ]),
        (err) => this.toastr.error(err),
      );
  }
}
