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
  MockRouter,
} from '../../../../test/mocks/classes';
import { category } from '../../../../test/mocks/data/categories.mock';
import { SharedModule } from '../../../shared.module';
import { CategoryResolver } from '../guards/category-resolver.service';
import { EditCategoryComponent } from './edit-category.component';

describe('EditCategoryComponent', () => {
  let activatedRouteStub: { testData: any };
  let categoryResolverStub: { setBook: jasmine.Spy };
  let component: EditCategoryComponent;
  let fixture: ComponentFixture<EditCategoryComponent>;
  let locationStub: { back: jasmine.Spy };
  let routerStub: {
    navigate: jasmine.Spy,
    testEvents: any,
  };
  let toastrServiceStub: { error: jasmine.Spy };

  beforeEach(async(() => {
    categoryResolverStub = jasmine.createSpyObj('CategoryResolver', ['setCategory']);
    locationStub = jasmine.createSpyObj('Location', ['back']);
    toastrServiceStub = jasmine.createSpyObj('ToastrService', ['error']);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgbModule.forRoot(),
        SharedModule,
      ],
      declarations: [ EditCategoryComponent ],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: CategoryResolver, useValue: categoryResolverStub },
        { provide: Router, useClass: MockRouter },
        { provide: ToastrService, useValue: toastrServiceStub },
        { provide: Location, useValue: locationStub },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCategoryComponent);
    component = fixture.componentInstance;
    activatedRouteStub = fixture.debugElement.injector.get(ActivatedRoute) as any;
    activatedRouteStub.testData = { category };
    routerStub = fixture.debugElement.injector.get(Router) as any;
    routerStub.testEvents = new NavigationEnd(1, '/categories/1/edit', '/categories/1/edit');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
