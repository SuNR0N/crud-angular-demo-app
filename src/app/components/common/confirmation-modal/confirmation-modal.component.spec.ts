import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import {
  NgbActiveModal,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';

import { MockNgbActiveModal } from '../../../../test/mocks/classes';
import { ConfirmationModalComponent } from './confirmation-modal.component';

describe('ConfirmationModalComponent', () => {
  let component: ConfirmationModalComponent;
  let fixture: ComponentFixture<ConfirmationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NgbModule.forRoot() ],
      declarations: [ ConfirmationModalComponent ],
      providers: [
        { provide: NgbActiveModal, useClass: MockNgbActiveModal },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
