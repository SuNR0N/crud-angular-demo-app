import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthorService } from '../../../api/author.service';
import { INewAuthorDTO } from '../../../interfaces/dtos/NewAuthorDTO';

@Component({
  selector: 'app-create-author',
  templateUrl: './create-author.component.html',
})
export class CreateAuthorComponent {
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
  ) { }

  listAuthors() {
    this.router.navigate([ 'authors' ]);
  }

  onSubmit() {
    const newAuthor: INewAuthorDTO = {
      ...this.createAuthorForm.value,
    };
    this.authorSerive.createAuthor(newAuthor)
      .subscribe(() => this.router.navigate([ 'authors' ]));
  }
}
