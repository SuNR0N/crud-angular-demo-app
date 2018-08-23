import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import {
  MockActivatedRoute,
  MockRouter,
} from '../../../../test/mocks/classes';
import { SharedModule } from '../../../shared.module';
import { CategoryRowComponent } from '../category-row/category-row.component';
import { ListCategoriesComponent } from './list-categories.component';

describe('ListCategoriesComponent', () => {
  let component: ListCategoriesComponent;
  let fixture: ComponentFixture<ListCategoriesComponent>;
  let toastrServiceStub: { error: jasmine.Spy };

  beforeEach(async(() => {
    toastrServiceStub = jasmine.createSpyObj('Toastr', ['error']);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SharedModule,
      ],
      declarations: [
        CategoryRowComponent,
        ListCategoriesComponent,
      ],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: Router, useClass: MockRouter },
        { provide: ToastrService, useValue: toastrServiceStub },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
