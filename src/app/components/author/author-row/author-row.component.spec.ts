import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorRowComponent } from './author-row.component';

describe('AuthorRowComponent', () => {
  let component: AuthorRowComponent;
  let fixture: ComponentFixture<AuthorRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorRowComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
