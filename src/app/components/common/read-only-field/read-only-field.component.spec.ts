import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadOnlyFieldComponent } from './read-only-field.component';

describe('ReadOnlyFieldComponent', () => {
  let component: ReadOnlyFieldComponent;
  let fixture: ComponentFixture<ReadOnlyFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadOnlyFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadOnlyFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
