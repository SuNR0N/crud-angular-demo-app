import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadOnlyFormGroupComponent } from './read-only-form-group.component';

describe('ReadOnlyFormGroupComponent', () => {
  let component: ReadOnlyFormGroupComponent;
  let fixture: ComponentFixture<ReadOnlyFormGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadOnlyFormGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadOnlyFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
