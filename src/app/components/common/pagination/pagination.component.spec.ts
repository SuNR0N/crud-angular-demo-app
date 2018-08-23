import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import {
  IBookDTO,
  IPageableCollectionDTO,
} from '../../../interfaces/dtos';
import { IconComponent } from '../icon/icon.component';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  const collectionMock: IPageableCollectionDTO<IBookDTO> = {
    _links: {},
    content: [],
    currentPage: 1,
    totalItems: 1,
    totalPages: 1,
  };
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        IconComponent,
        PaginationComponent,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    component.pageableCollection = collectionMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
