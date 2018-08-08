import {
  Component,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import { IAuthorDTO } from '../../../interfaces/dtos/AuthorDTO';

@Component({
  selector: 'app-view-author',
  templateUrl: './view-author.component.html',
  styleUrls: ['./view-author.component.scss']
})
export class ViewAuthorComponent implements OnInit {
  public author: IAuthorDTO;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.author = this.route.snapshot.data['author'];
  }

  deleteAuthor() {
    // TODO
  }

  editAuthor(author: IAuthorDTO) {
    this.router.navigate([ 'edit' ], { relativeTo: this.route });
  }
}
