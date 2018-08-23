import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import {
  MockActivatedRoute,
  MockCategoryResolver,
  MockLocation,
  MockRouter,
  MockToastrService,
} from '../../../../test/mocks/classes';
import { category } from '../../../../test/mocks/data/categories.mock';
import { SharedModule } from '../../../shared.module';
import { CategoryResolver } from '../guards/category-resolver.service';
import { EditCategoryComponent } from './edit-category.component';

describe('EditCategoryComponent', () => {
  let activatedRouteMock: MockActivatedRoute;
  let component: EditCategoryComponent;
  let fixture: ComponentFixture<EditCategoryComponent>;
  let routerMock: MockRouter;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgbModule.forRoot(),
        SharedModule,
      ],
      declarations: [ EditCategoryComponent ],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: CategoryResolver, useClass: MockCategoryResolver },
        { provide: Router, useClass: MockRouter },
        { provide: ToastrService, useClass: MockToastrService },
        { provide: Location, useClass: MockLocation },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    activatedRouteMock = TestBed.get(ActivatedRoute);
    routerMock = TestBed.get(Router);
    fixture = TestBed.createComponent(EditCategoryComponent);
    component = fixture.componentInstance;
    activatedRouteMock.testData = { category };
    routerMock.testEvents = new NavigationEnd(1, '/categories/1/edit', '/categories/1/edit');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
