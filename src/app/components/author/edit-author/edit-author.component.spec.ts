import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  of,
  throwError,
} from 'rxjs';

import {
  MockActivatedRoute,
  MockAuthorResolver,
  MockLocation,
  MockRouter,
  MockToastrService,
} from '../../../../test/mocks/classes';
import { author } from '../../../../test/mocks/data/authors.mock';
import { IAuthorDTO } from '../../../interfaces/dtos/AuthorDTO';
import { SharedModule } from '../../../shared.module';
import { AuthorResolver } from '../guards/author-resolver.service';
import { EditAuthorComponent } from './edit-author.component';

describe('EditAuthorComponent', () => {
  let activatedRouteMock: MockActivatedRoute;
  let component: EditAuthorComponent;
  let fixture: ComponentFixture<EditAuthorComponent>;
  let authorResolverMock: MockAuthorResolver;
  let locationMock: MockLocation;
  let routerMock: MockRouter;
  let toastrServiceMock: MockToastrService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SharedModule,
      ],
      declarations: [ EditAuthorComponent ],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: AuthorResolver, useClass: MockAuthorResolver },
        { provide: Router, useClass: MockRouter },
        { provide: ToastrService, useClass: MockToastrService },
        { provide: Location, useClass: MockLocation },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    authorResolverMock = TestBed.get(AuthorResolver);
    locationMock = TestBed.get(Location);
    toastrServiceMock = TestBed.get(ToastrService);
    activatedRouteMock = TestBed.get(ActivatedRoute);
    routerMock = TestBed.get(Router);
    fixture = TestBed.createComponent(EditAuthorComponent);
    activatedRouteMock.testData = { author };
    routerMock.testEvents = new NavigationEnd(1, '/authors/1/edit', '/authors/1/edit');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ID', () => {
    it('should display its label as "ID"', () => {
      const idLabel: HTMLElement = fixture.debugElement
        .query(By.css('#idLabel'))
        .nativeElement;

      expect(idLabel.textContent.trim()).toBe('ID');
    });

    it('should display its value', () => {
      const idInput: HTMLInputElement = fixture.debugElement
        .query(By.css('input#id'))
        .nativeElement;

      expect(idInput.value).toBe('1337');
    });
  });

  describe('First Name', () => {
    let firstNameLabel: HTMLElement;

    beforeEach(() => {
      firstNameLabel = fixture.debugElement
        .query(By.css('#firstNameLabel'))
        .nativeElement;
    });

    it('should display its label as "First Name"', () => {
      expect(firstNameLabel.textContent.trim()).toBe('First Name');
    });

    it('should have a required class on its label', () => {
      expect(firstNameLabel.classList).toContain('required');
    });

    it('should display its value', () => {
      const firstNameInput: HTMLInputElement = fixture.debugElement
        .query(By.css('input#firstName'))
        .nativeElement;

      expect(firstNameInput.value).toBe('John');
    });
  });

  describe('Middle Name', () => {
    let middleNameLabel: HTMLElement;

    beforeEach(() => {
      middleNameLabel = fixture.debugElement
        .query(By.css('#middleNameLabel'))
        .nativeElement;
    });

    it('should display its label as "Middle Name"', () => {
      expect(middleNameLabel.textContent.trim()).toBe('Middle Name');
    });

    it('should not have a required class on its label', () => {
      expect(middleNameLabel.classList).not.toContain('required');
    });

    it('should display its value', () => {
      const middleNameInput: HTMLInputElement = fixture.debugElement
        .query(By.css('input#middleName'))
        .nativeElement;

      expect(middleNameInput.value).toBe('X.');
    });
  });

  describe('Last Name', () => {
    let lastNameLabel: HTMLElement;

    beforeEach(() => {
      lastNameLabel = fixture.debugElement
        .query(By.css('#lastNameLabel'))
        .nativeElement;
    });

    it('should display its label as "Last Name"', () => {
      expect(lastNameLabel.textContent.trim()).toBe('Last Name');
    });

    it('should have a required class on its label', () => {
      expect(lastNameLabel.classList).toContain('required');
    });

    it('should display its value', () => {
      const lastNameInput: HTMLInputElement = fixture.debugElement
        .query(By.css('input#lastName'))
        .nativeElement;

      expect(lastNameInput.value).toBe('Doe');
    });
  });

  it('should have an enabled Save button by default', () => {
    const saveButton: HTMLButtonElement = fixture.debugElement
      .query(By.css('button[type="submit"]'))
      .nativeElement;

    expect(saveButton.disabled).toBeFalsy();
  });

  it('should have a disabled Save button when the form becomes invalid', () => {
    component.editAuthorForm.controls['firstName'].setValue('');
    fixture.detectChanges();
    const saveButton: HTMLButtonElement = fixture.debugElement
      .query(By.css('button[type="submit"]'))
      .nativeElement;

    expect(saveButton.disabled).toBeTruthy();
  });

  it('should navigate back when the Cancel button is clicked', () => {
    const cancelButton: HTMLButtonElement = fixture.debugElement
      .query(By.css('button[class*="btn-outline-secondary"]'))
      .nativeElement;
    cancelButton.click();

    expect(locationMock.back).toHaveBeenCalled();
  });

  describe('given the Save button is clicked', () => {
    const updatedAuthorMock = {} as IAuthorDTO;
    let requestSpy: jasmine.Spy;
    let saveButton: HTMLButtonElement;

    beforeEach(() => {
      requestSpy = spyOn((component as any).resourceService, 'request');
      requestSpy.and.returnValue(of(updatedAuthorMock));
      saveButton = fixture.debugElement
        .query(By.css('button[type="submit"]'))
        .nativeElement;
    });

    it('should initate the request with the update link of the entity', () => {
      saveButton.click();

      const [ link ] = requestSpy.calls.mostRecent().args;
      expect(link).toEqual(author._links.update);
    });

    it('should only send the first name in the patch if it changed', () => {
      component.editAuthorForm.controls['firstName'].setValue('Jane');
      fixture.detectChanges();
      saveButton.click();

      const data = requestSpy.calls.mostRecent().args[1];
      expect(data).toEqual({ firstName: 'Jane' });
    });

    it('should only send the middle name in the patch if it changed', () => {
      component.editAuthorForm.controls['middleName'].setValue('');
      fixture.detectChanges();
      saveButton.click();

      const data = requestSpy.calls.mostRecent().args[1];
      expect(data).toEqual({ middleName: '' });
    });

    it('should only send the last name in the patch if it changed', () => {
      component.editAuthorForm.controls['lastName'].setValue('Roe');
      fixture.detectChanges();
      saveButton.click();

      const data = requestSpy.calls.mostRecent().args[1];
      expect(data).toEqual({ lastName: 'Roe' });
    });

    describe('and the update succeeds', () => {
      beforeEach(() => {
        saveButton.click();
      });

      it('should set the updated author in the resolver', () => {
        expect(authorResolverMock.setAuthor).toHaveBeenCalledWith(updatedAuthorMock);
      });

      it('should navigate to the parent route', () => {
        const [ commands, extras ] = routerMock.navigate.calls.mostRecent().args;

        expect(commands).toEqual([ '../' ]);
        expect(extras).toEqual({ relativeTo: activatedRouteMock });
      });
    });

    it('should raise a toastr error if the service call fails', () => {
      requestSpy.and.returnValue(throwError('Error'));
      saveButton.click();

      expect(toastrServiceMock.error).toHaveBeenCalledWith('Error');
    });
  });
});
