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
  MockToastrService,
} from '../../../../test/mocks/classes';
import { SharedModule } from '../../../shared.module';
import { PublisherRowComponent } from '../publisher-row/publisher-row.component';
import { ListPublishersComponent } from './list-publishers.component';

describe('ListPublishersComponent', () => {
  let component: ListPublishersComponent;
  let fixture: ComponentFixture<ListPublishersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SharedModule,
      ],
      declarations: [
        ListPublishersComponent,
        PublisherRowComponent,
      ],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: Router, useClass: MockRouter },
        { provide: ToastrService, useClass: MockToastrService },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPublishersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
