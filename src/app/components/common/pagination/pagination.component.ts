import {
  Component,
  Output,
  EventEmitter,
  Input,
  HostBinding,
} from '@angular/core';

import {
  IHATEOASLink,
  IPageableCollectionDTO,
} from '../../../interfaces';

@Component({
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    class: 'pagination',
  },
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  @HostBinding('class.pagination--disabled') @Input() disabled = false;
  @Input() pageableCollection: IPageableCollectionDTO<any>;
  @Input() pageSize = 10;
  @Output() paginate = new EventEmitter<IHATEOASLink>(null);

  navigateFirst() {
    this.paginate.emit(this.pageableCollection._links.first);
  }

  navigatePrevious() {
    this.paginate.emit(this.pageableCollection._links.previous);
  }

  navigateNext() {
    this.paginate.emit(this.pageableCollection._links.next);
  }

  navigateLast() {
    this.paginate.emit(this.pageableCollection._links.last);
  }

  get firstLinkDisabled() {
    return !(this.pageableCollection._links && this.pageableCollection._links.first) || this.disabled;
  }

  get previousLinkDisabled() {
    return !(this.pageableCollection._links && this.pageableCollection._links.previous) || this.disabled;
  }

  get nextLinkDisabled() {
    return !(this.pageableCollection._links && this.pageableCollection._links.next) || this.disabled;
  }

  get lastLinkDisabled() {
    return !(this.pageableCollection._links && this.pageableCollection._links.last) || this.disabled;
  }

  get firstItemOfCurrentPage() {
    return (this.pageableCollection.currentPage - 1) * this.pageSize + 1;
  }

  get lastItemOfCurrentPage() {
    return this.firstItemOfCurrentPage + this.pageableCollection.content.length - 1;
  }
}
