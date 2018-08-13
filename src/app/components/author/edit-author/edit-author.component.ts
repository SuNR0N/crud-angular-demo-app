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
  IAuthorDTO,
  IAuthorUpdateDTO,
} from '../../../interfaces/dtos';
import { BaseComponent } from '../../common/base/base.component';
import { AuthorResolver } from '../guards/author-resolver.service';

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
})
export class EditAuthorComponent extends BaseComponent implements OnInit {
  public author: IAuthorDTO;
  public editAuthorForm = this.fb.group({
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
    private authorResolver: AuthorResolver,
    private fb: FormBuilder,
    private location: Location,
    private resourceService: ResourceService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) {
    super();
    this.initialiseRouterEvents();
  }

  ngOnInit() {
    this.editAuthorForm.setValue({
      firstName: this.author.firstName,
      middleName: this.author.middleName,
      lastName: this.author.lastName,
    });
  }

  cancel() {
    this.location.back();
  }

  onSubmit() {
    const updatedAuthor: IAuthorUpdateDTO = {
      ...(
        this.author.firstName !== this.editAuthorForm.value.firstName ?
        { firstName: this.editAuthorForm.value.firstName } :
        {}
      ),
      ...(
        this.author.middleName !== this.editAuthorForm.value.middleName ?
        { middleName: this.editAuthorForm.value.middleName } :
        {}
      ),
      ...(
        this.author.lastName !== this.editAuthorForm.value.lastName ?
        { lastName: this.editAuthorForm.value.lastName } :
        {}
      ),
    };
    this.resourceService.request<IAuthorDTO>(this.author._links.update, updatedAuthor)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (author) => {
          this.authorResolver.setAuthor(author);
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
          this.author = this.route.snapshot.data['author'];
        }
      });
  }
}
