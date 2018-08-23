import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { publisher } from '../../../../test/mocks/data/publishers.mock';
import { SharedModule } from '../../../shared.module';
import { PublisherRowComponent } from './publisher-row.component';

describe('PublisherRowComponent', () => {
  let component: PublisherRowComponent;
  let fixture: ComponentFixture<PublisherRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule.forRoot(),
        RouterTestingModule,
        SharedModule,
      ],
      declarations: [ PublisherRowComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublisherRowComponent);
    component = fixture.componentInstance;
    component.publisher = publisher;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
