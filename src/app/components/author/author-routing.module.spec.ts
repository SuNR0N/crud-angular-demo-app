import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import {
  MockAuthGuard,
  MockAuthorResolver,
  MockToastrService,
} from '../../../test/mocks/classes';
import { AppComponent } from '../../app.component';
import { AuthGuard } from '../../guards/auth-guard.service';
import { authorRoutes } from './author-routing.module';
import { AuthorModule } from './author.module';
import { AuthorResolver } from './guards/author-resolver.service';

describe('AuthorRoutingModule', () => {
  let authGuardMock: MockAuthGuard;
  let router: Router;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AuthorModule,
        HttpClientTestingModule,
        NgbModule.forRoot(),
        RouterTestingModule.withRoutes(authorRoutes),
      ],
      declarations: [ AppComponent ],
      providers: [
        { provide: AuthGuard, useClass: MockAuthGuard },
        { provide: AuthorResolver, useClass: MockAuthorResolver },
        { provide: ToastrService, useClass: MockToastrService },
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    });

    authGuardMock = TestBed.get(AuthGuard);
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(AppComponent);
  });

  it('should load the ListAuthorsComponent when a user navigates to root', fakeAsync(() => {
    router.navigate(['']);
    tick();
    const component: HTMLElement = fixture.debugElement
      .query(By.css('app-list-authors'))
      .nativeElement;

    expect(component).toBeTruthy();
  }));

  it('should load the CreateAuthorComponent when an authenticated user navigates to "/create"', fakeAsync(() => {
    authGuardMock.canActivate.and.returnValue(true);
    router.navigate(['create']);
    tick();
    const component: HTMLElement = fixture.debugElement
      .query(By.css('app-create-author'))
      .nativeElement;

    expect(component).toBeTruthy();
  }));

  it('should not load the ListAuthorsComponent when an unauthenticated user navigates to "/create"', fakeAsync(() => {
    authGuardMock.canActivate.and.returnValue(false);
    router.navigate(['create']);
    tick();
    const component = fixture.debugElement
      .query(By.css('app-create-author'));

    expect(component).toBeFalsy();
  }));

  it('should load the ViewAuthorComponent when a user navigates to "/:id"', fakeAsync(() => {
    router.navigate([1]);
    tick();
    const component = fixture.debugElement
      .query(By.css('app-view-author'));

    expect(component).toBeTruthy();
  }));

  it('should load the EditAuthorComponent when a user navigates to "/:id/edit"', fakeAsync(() => {
    router.navigate([1, 'edit']);
    tick();
    const component = fixture.debugElement
      .query(By.css('app-edit-author'));

    expect(component).toBeTruthy();
  }));
});
