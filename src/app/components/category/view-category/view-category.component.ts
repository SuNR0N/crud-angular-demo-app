import {
  Component,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import { ICategoryDTO } from '../../../interfaces/dtos/CategoryDTO';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss']
})
export class ViewCategoryComponent implements OnInit {
  public category: ICategoryDTO;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.category = this.route.snapshot.data['category'];
  }

  deleteCategory() {
    // TODO
  }

  editCategory(category: ICategoryDTO) {
    this.router.navigate([ 'edit' ], { relativeTo: this.route });
  }
}
