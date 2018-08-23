import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import {
  NgbActiveModal,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';

import { ConfirmationModalComponent } from './confirmation-modal.component';

describe('ConfirmationModalComponent', () => {
  let component: ConfirmationModalComponent;
  let fixture: ComponentFixture<ConfirmationModalComponent>;
  let ngbActiveModalStub: {
    dismiss: jasmine.Spy,
    close: jasmine.Spy,
  };

  beforeEach(async(() => {
    ngbActiveModalStub = jasmine.createSpyObj('NgbActiveModal', ['dismiss', 'close']);
    TestBed.configureTestingModule({
      imports: [ NgbModule.forRoot() ],
      declarations: [ ConfirmationModalComponent ],
      providers: [
        { provide: NgbActiveModal, useValue: ngbActiveModalStub },
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
