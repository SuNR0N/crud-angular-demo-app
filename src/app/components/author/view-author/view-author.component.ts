import {
  Component,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  ParamMap,
  Router,
} from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { AuthorService } from '../../../api/author.service';
import { IAuthorDTO } from '../../../interfaces/dtos/AuthorDTO';

@Component({
  selector: 'app-view-author',
  templateUrl: './view-author.component.html',
  styleUrls: ['./view-author.component.scss']
})
export class ViewAuthorComponent implements OnInit {
  author: IAuthorDTO;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authorService: AuthorService,
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.authorService.getAuthor(Number(params.get('id'))))
    ).subscribe((author) => this.author = author);
  }

  deleteAuthor() {
    // TODO
  }

  editAuthor(author: IAuthorDTO) {
    this.router.navigate([ 'edit' ], { relativeTo: this.route });
  }
}
