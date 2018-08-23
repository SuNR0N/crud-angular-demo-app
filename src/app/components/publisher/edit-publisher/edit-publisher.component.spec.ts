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
  MockLocation,
  MockPublisherResolver,
  MockRouter,
  MockToastrService,
} from '../../../../test/mocks/classes';
import { publisher } from '../../../../test/mocks/data/publishers.mock';
import { SharedModule } from '../../../shared.module';
import { PublisherResolver } from '../guards/publisher-resolver.service';
import { EditPublisherComponent } from './edit-publisher.component';

describe('EditPublisherComponent', () => {
  let activatedRouteMock: MockActivatedRoute;
  let component: EditPublisherComponent;
  let fixture: ComponentFixture<EditPublisherComponent>;
  let routerMock: MockRouter;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgbModule.forRoot(),
        SharedModule,
      ],
      declarations: [ EditPublisherComponent ],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: PublisherResolver, useClass: MockPublisherResolver },
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
    fixture = TestBed.createComponent(EditPublisherComponent);
    component = fixture.componentInstance;
    activatedRouteMock.testData = { publisher };
    routerMock.testEvents = new NavigationEnd(1, '/publishers/1/edit', '/publishers/1/edit');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
