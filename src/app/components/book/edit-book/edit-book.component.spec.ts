import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
} from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import {
  MockActivatedRoute,
  MockRouter,
} from '../../../../test/mocks/classes';
import { book } from '../../../../test/mocks/data/books.mock';
import { SharedModule } from '../../../shared.module';
import { BookResolver } from '../guards/book-resolver.service';
import { EditBookComponent } from './edit-book.component';

describe('EditBookComponent', () => {
  let activatedRouteStub: { testData: any };
  let bookResolverStub: { setBook: jasmine.Spy };
  let component: EditBookComponent;
  let fixture: ComponentFixture<EditBookComponent>;
  let locationStub: { back: jasmine.Spy };
  let routerStub: {
    navigate: jasmine.Spy,
    testEvents: any,
  };
  let toastrServiceStub: { error: jasmine.Spy };

  beforeEach(async(() => {
    bookResolverStub = jasmine.createSpyObj('BookResolver', ['setBook']);
    locationStub = jasmine.createSpyObj('Location', ['back']);
    toastrServiceStub = jasmine.createSpyObj('ToastrService', ['error']);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgbModule.forRoot(),
        SharedModule,
      ],
      declarations: [ EditBookComponent ],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: BookResolver, useValue: bookResolverStub },
        { provide: Router, useClass: MockRouter },
        { provide: ToastrService, useValue: toastrServiceStub },
        { provide: Location, useValue: locationStub },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBookComponent);
    component = fixture.componentInstance;
    activatedRouteStub = fixture.debugElement.injector.get(ActivatedRoute) as any;
    activatedRouteStub.testData = { book };
    routerStub = fixture.debugElement.injector.get(Router) as any;
    routerStub.testEvents = new NavigationEnd(1, '/books/1/edit', '/books/1/edit');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
