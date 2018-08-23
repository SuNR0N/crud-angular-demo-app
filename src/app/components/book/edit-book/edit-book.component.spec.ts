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
  MockBookResolver,
  MockLocation,
  MockRouter,
  MockToastrService,
} from '../../../../test/mocks/classes';
import { book } from '../../../../test/mocks/data/books.mock';
import { SharedModule } from '../../../shared.module';
import { BookResolver } from '../guards/book-resolver.service';
import { EditBookComponent } from './edit-book.component';

describe('EditBookComponent', () => {
  let activatedRouteMock: MockActivatedRoute;
  let component: EditBookComponent;
  let fixture: ComponentFixture<EditBookComponent>;
  let routerMock: MockRouter;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgbModule.forRoot(),
        SharedModule,
      ],
      declarations: [ EditBookComponent ],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: BookResolver, useClass: MockBookResolver },
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
    fixture = TestBed.createComponent(EditBookComponent);
    component = fixture.componentInstance;
    activatedRouteMock.testData = { book };
    routerMock.testEvents = new NavigationEnd(1, '/books/1/edit', '/books/1/edit');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
