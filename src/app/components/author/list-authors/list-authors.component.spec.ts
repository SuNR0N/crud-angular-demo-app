
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
} from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import {
  of,
  throwError,
} from 'rxjs';

import {
  MockActivatedRoute,
  MockRouter,
} from '../../../../test/mocks/classes';
import { authorWithDeleteLink } from '../../../../test/mocks/data';
import {
  AuthorService,
  ResourceService,
} from '../../../api';
import { IAuthorDTO } from '../../../interfaces/dtos/AuthorDTO';
import {
  ProfileService,
  SpinnerService,
} from '../../../services';
import { SharedModule } from '../../../shared.module';
import { AuthorRowComponent } from '../author-row/author-row.component';
import { ListAuthorsComponent } from './list-authors.component';

describe('ListAuthorsComponent', () => {
  const authorsMock: IAuthorDTO[] = [
    authorWithDeleteLink,
    {
      firstName: 'Jane',
      fullName: 'Jane Doe',
      id: 2,
      lastName: 'Doe',
      _links: {
        self: {
          href: '/api/v1/authors/2',
          method: 'GET',
        },
        delete: {
          href: '/api/v1/authors/2',
          method: 'DELETE',
        },
      },
    },
  ];
  let activatedRouteStub: { testQueryParamMap: any };
  let authorServiceStub: { getAuthors: jasmine.Spy };
  let component: ListAuthorsComponent;
  let fixture: ComponentFixture<ListAuthorsComponent>;
  let profileServiceStub: { getProfile: jasmine.Spy };
  let resourceServiceStub: { request: jasmine.Spy };
  let routerStub: {
    navigate: jasmine.Spy,
    testEvents: any,
  };
  let spinnerServiceStub: { matches: jasmine.Spy };
  let toastrServiceStub: { error: jasmine.Spy };

  beforeEach(async(() => {
    authorServiceStub = jasmine.createSpyObj('AuthorService', ['getAuthors']);
    profileServiceStub = jasmine.createSpyObj('ProfileService', ['getProfile']);
    resourceServiceStub = jasmine.createSpyObj('ResourceService', ['request']);
    spinnerServiceStub = jasmine.createSpyObj('SpinnerService', ['matches']);
    toastrServiceStub = jasmine.createSpyObj('Toastr', ['error']);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgbModule.forRoot(),
        SharedModule,
      ],
      declarations: [
        AuthorRowComponent,
        ListAuthorsComponent,
      ],
      providers: [
        { provide: AuthorService, useValue: authorServiceStub },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: ProfileService, useValue: profileServiceStub },
        { provide: ResourceService, useValue: resourceServiceStub },
        { provide: Router, useClass: MockRouter },
        { provide: SpinnerService, useValue: spinnerServiceStub },
        { provide: ToastrService, useValue: toastrServiceStub },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    authorServiceStub.getAuthors.and.returnValue(of(authorsMock));
    fixture = TestBed.createComponent(ListAuthorsComponent);
    activatedRouteStub = fixture.debugElement.injector.get(ActivatedRoute) as any;
    routerStub = fixture.debugElement.injector.get(Router) as any;
    routerStub.testEvents = new NavigationEnd(1, '/authors', '/authors');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the Create button if the profile does not exist', () => {
    const createButton: HTMLButtonElement = fixture.debugElement
      .query(By.css('button[text="Create New Author"]'))
      .nativeElement;

    expect(createButton.disabled).toBeTruthy();
  });

  it('should enable the Create button if the profile exists', () => {
    profileServiceStub.getProfile.and.returnValue(of({}));
    fixture.detectChanges();
    const createButton: HTMLButtonElement = fixture.debugElement
      .query(By.css('button[text="Create New Author"]'))
      .nativeElement;

    expect(createButton.disabled).toBeFalsy();
  });

  it('should navigate to the Create page when the Create button is clicked', () => {
    profileServiceStub.getProfile.and.returnValue(of({}));
    fixture.detectChanges();
    const createButton: HTMLButtonElement = fixture.debugElement
      .query(By.css('button[text="Create New Author"]'))
      .nativeElement;
    createButton.click();

    expect(routerStub.navigate).toHaveBeenCalledWith(['create'], { relativeTo: activatedRouteStub });
  });

  describe('ngOnInit', () => {
    it('should call the getAuthors function with the query param if it exists', () => {
      activatedRouteStub.testQueryParamMap = { q: 'foo' };
      routerStub.testEvents = new NavigationEnd(1, '/authors', '/authors');
      fixture.detectChanges();

      expect(authorServiceStub.getAuthors).toHaveBeenCalledWith('foo');
    });

    it('should call the getAuthors function without param if the query param does not exist', () => {
      expect(authorServiceStub.getAuthors).toHaveBeenCalledWith(null);
    });

    it('should display as many rows the number of returned authors', () => {
      const rows = fixture.debugElement
        .queryAll(By.css('tbody tr'));

      expect(rows.length).toBe(2);
    });

    it('should raise a toastr error if the service call fails', () => {
      authorServiceStub.getAuthors.and.returnValue(throwError('Error'));
      fixture = TestBed.createComponent(ListAuthorsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      expect(toastrServiceStub.error).toHaveBeenCalledWith('Error');
    });
  });

  describe('given the requests are pending', () => {
    beforeEach(() => {
      spinnerServiceStub.matches.and.returnValue(true);
      fixture.detectChanges();
    });

    it('should show the spinner', () => {
      const spinner = fixture.debugElement
        .query(By.css('app-spinner'));

      expect(spinner).toBeTruthy();
    });

    it('should not show the results', () => {
      const table = fixture.debugElement
        .query(By.css('.table-responsive'));

      expect(table).toBeFalsy();
    });
  });

  describe('given the requests are not pending', () => {
    beforeEach(() => {
      spinnerServiceStub.matches.and.returnValue(false);
      fixture.detectChanges();
    });

    it('should not show the spinner', () => {
      const spinner = fixture.debugElement
        .query(By.css('app-spinner'));

      expect(spinner).toBeFalsy();
    });

    it('should show the results', () => {
      const table = fixture.debugElement
        .query(By.css('.table-responsive'));

      expect(table).toBeTruthy();
    });
  });

  describe('onSearchTextChange', () => {
    let input: HTMLInputElement;

    beforeEach(() => {
      input = fixture.debugElement
        .query(By.css('input'))
        .nativeElement;
    });

    it('should call the getAuthors function with the search term if the text changes', fakeAsync(() => {
      input.value = 'Foo';
      input.dispatchEvent(new Event('keyup'));
      tick(500);

      expect(authorServiceStub.getAuthors).toHaveBeenCalledWith('Foo');
    }));

    it('should display as many rows the number of returned authors', fakeAsync(() => {
      authorServiceStub.getAuthors.and.returnValue(of([]));
      input.value = 'Foo';
      input.dispatchEvent(new Event('keyup'));
      tick(500);
      fixture.detectChanges();

      const rows = fixture.debugElement
        .queryAll(By.css('tbody tr'));

      expect(rows.length).toBe(0);
    }));

    it('should raise a toastr error if the service call fails', fakeAsync(() => {
      authorServiceStub.getAuthors.and.returnValue(throwError('Error'));
      input.value = 'Foo';
      input.dispatchEvent(new Event('keyup'));
      tick(500);

      expect(toastrServiceStub.error).toHaveBeenCalledWith('Error');
    }));
  });

  describe('onDelete', () => {
    function deleteAuthor() {
      const deleteButton: HTMLButtonElement = fixture.debugElement
        .queryAll(By.css('tbody tr'))[0]
        .query(By.css('button[symbol="trash-alt-regular"]'))
        .nativeElement;
      deleteButton.click();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const confirmButton: HTMLButtonElement = document.querySelector('.modal-footer button[class*="btn-outline-danger"]');
        confirmButton.click();
        fixture.detectChanges();
      });
    }

    describe('given the request fails', () => {
      beforeEach(async(() => {
        resourceServiceStub.request.and.returnValue(throwError('Error'));
        deleteAuthor();
      }));

      it('should raise a toastr error', () => {
        expect(toastrServiceStub.error).toHaveBeenCalledWith('Error');
      });
    });

    describe('given the request succeeds', () => {
      let firstAuthor: IAuthorDTO;

      beforeAll(() => {
        firstAuthor = { ...authorsMock[0] };
      });

      beforeEach(async(() => {
        resourceServiceStub.request.and.returnValue(of(true));
        deleteAuthor();
      }));

      it('should call the request with the delete link', () => {
        expect(resourceServiceStub.request).toHaveBeenCalledWith(firstAuthor._links.delete);
      });

      it('should should remove the deleted author from the list if the service call succeeds', () => {
        const rows = fixture.debugElement
          .queryAll(By.css('tbody tr'));
        const idCell: HTMLElement = rows[0]
          .queryAll(By.css('td'))[0]
          .nativeElement;

        expect(rows.length).toBe(1);
        expect(idCell.textContent).not.toEqual(String(firstAuthor.id));
      });
    });
  });
});
