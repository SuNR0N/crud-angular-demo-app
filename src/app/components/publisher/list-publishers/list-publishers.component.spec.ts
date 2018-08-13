import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPublishersComponent } from './list-publishers.component';

describe('ListPublishersComponent', () => {
  let component: ListPublishersComponent;
  let fixture: ComponentFixture<ListPublishersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPublishersComponent ],
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
