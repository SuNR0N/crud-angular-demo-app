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
import { publisher } from '../../../../test/mocks/data/publishers.mock';
import { SharedModule } from '../../../shared.module';
import { PublisherResolver } from '../guards/publisher-resolver.service';
import { EditPublisherComponent } from './edit-publisher.component';

describe('EditPublisherComponent', () => {
  let activatedRouteStub: { testData: any };
  let component: EditPublisherComponent;
  let fixture: ComponentFixture<EditPublisherComponent>;
  let locationStub: { back: jasmine.Spy };
  let toastrServiceStub: { error: jasmine.Spy };
  let routerStub: {
    navigate: jasmine.Spy,
    testEvents: any,
  };
  let publisherResolverStub: { setBook: jasmine.Spy };

  beforeEach(async(() => {
    publisherResolverStub = jasmine.createSpyObj('PublisherResolver', ['setPublisher']);
    locationStub = jasmine.createSpyObj('Location', ['back']);
    toastrServiceStub = jasmine.createSpyObj('ToastrService', ['error']);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgbModule.forRoot(),
        SharedModule,
      ],
      declarations: [ EditPublisherComponent ],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: PublisherResolver, useValue: publisherResolverStub },
        { provide: Router, useClass: MockRouter },
        { provide: ToastrService, useValue: toastrServiceStub },
        { provide: Location, useValue: locationStub },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPublisherComponent);
    component = fixture.componentInstance;
    activatedRouteStub = fixture.debugElement.injector.get(ActivatedRoute) as any;
    activatedRouteStub.testData = { publisher };
    routerStub = fixture.debugElement.injector.get(Router) as any;
    routerStub.testEvents = new NavigationEnd(1, '/publishers/1/edit', '/publishers/1/edit');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
