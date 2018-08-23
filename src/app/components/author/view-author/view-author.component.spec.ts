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
import {
  author,
  authorWithDeleteLink,
  authorWithUpdateLink,
} from '../../../../test/mocks/data/authors.mock';
import { ResourceService } from '../../../api/resource.service';
import { SharedModule } from '../../../shared.module';
import { ViewAuthorComponent } from './view-author.component';

describe('ViewAuthorComponent', () => {
  let activatedRouteStub: { testData: any };
  let component: ViewAuthorComponent;
  let fixture: ComponentFixture<ViewAuthorComponent>;
  let resourceServiceStub: { request: jasmine.Spy };
  let routerStub: {
    navigate: jasmine.Spy,
    testEvents: any,
  };
  let toastrServiceStub: { error: jasmine.Spy };

  beforeEach(async(() => {
    resourceServiceStub = jasmine.createSpyObj('ResourceService', ['request']);
    toastrServiceStub = jasmine.createSpyObj('ToastrService', ['error']);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgbModule.forRoot(),
        SharedModule,
      ],
      declarations: [ ViewAuthorComponent ],
      providers: [
        { provide: ResourceService, useValue: resourceServiceStub },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: Router, useClass: MockRouter },
        { provide: ToastrService, useValue: toastrServiceStub },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAuthorComponent);
    activatedRouteStub = fixture.debugElement.injector.get(ActivatedRoute) as any;
    activatedRouteStub.testData = { author };
    routerStub = fixture.debugElement.injector.get(Router) as any;
    routerStub.testEvents = new NavigationEnd(1, '/authors/1', '/authors/1');
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
    it('should display its label as "First Name"', () => {
      const firstNameLabel: HTMLElement = fixture.debugElement
        .query(By.css('#firstNameLabel'))
        .nativeElement;

      expect(firstNameLabel.textContent.trim()).toBe('First Name');
    });

    it('should display its value', () => {
      const firstNameInput: HTMLInputElement = fixture.debugElement
        .query(By.css('input#firstName'))
        .nativeElement;

      expect(firstNameInput.value).toBe('John');
    });
  });

  describe('Middle Name', () => {
    it('should display its label as "Middle Name"', () => {
      const middleNameLabel: HTMLElement = fixture.debugElement
        .query(By.css('#middleNameLabel'))
        .nativeElement;

      expect(middleNameLabel.textContent.trim()).toBe('Middle Name');
    });

    it('should display its value', () => {
      const middleNameInput: HTMLInputElement = fixture.debugElement
        .query(By.css('input#middleName'))
        .nativeElement;

      expect(middleNameInput.value).toBe('X.');
    });
  });

  describe('Last Name', () => {
    it('should display its label as "Last Name"', () => {
      const lastNameLabel: HTMLElement = fixture.debugElement
        .query(By.css('#lastNameLabel'))
        .nativeElement;

      expect(lastNameLabel.textContent.trim()).toBe('Last Name');
    });

    it('should display its value', () => {
      const lastNameInput: HTMLInputElement = fixture.debugElement
        .query(By.css('input#lastName'))
        .nativeElement;

      expect(lastNameInput.value).toBe('Doe');
    });
  });

  it('should display the Edit button if the given author has an update action', () => {
    component.author = authorWithUpdateLink;
    fixture.detectChanges();
    const editButton = fixture.debugElement
      .query(By.css('button[class*="btn-outline-secondary"]'));

    expect(editButton).toBeTruthy();
  });

  it('should not display the Edit button if the given author does not have an update action', () => {
    const editButton = fixture.debugElement
      .query(By.css('button[class*="btn-outline-secondary"]'));

    expect(editButton).toBeFalsy();
  });

  it('should display the Delete button if the given author has a delete action', () => {
    component.author = authorWithDeleteLink;
    fixture.detectChanges();
    const deleteButton = fixture.debugElement
      .query(By.css('button[class*="btn-outline-danger"]'));

    expect(deleteButton).toBeTruthy();
  });

  it('should not display the Delete button if the given author does not have a delete action', () => {
    const deleteButton = fixture.debugElement
      .query(By.css('button[class*="btn-outline-danger"]'));

    expect(deleteButton).toBeFalsy();
  });

  it('should navigate to the Edit page when the Edit button is clicked', () => {
    component.author = authorWithUpdateLink;
    fixture.detectChanges();
    const editButton: HTMLButtonElement = fixture.debugElement
      .query(By.css('button[class*="btn-outline-secondary"]')).nativeElement;
    editButton.click();

    expect(routerStub.navigate).toHaveBeenCalledWith([ 'edit' ], { relativeTo: activatedRouteStub });
  });

  it('should display a modal displaying the full name of the author when the Delete button is clicked', async(() => {
    component.author = authorWithDeleteLink;
    fixture.detectChanges();
    const deleteButton: HTMLButtonElement = fixture.debugElement
      .query(By.css('button[class*="btn-outline-danger"]'))
      .nativeElement;
    deleteButton.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const modalBody = document.querySelector('.modal-body');
      expect(modalBody.textContent.trim()).toMatch(/^Are you sure you want to delete John X\. Doe.\(ID: 1337\) \?$/);
      const cancelButton: HTMLButtonElement = document.querySelector('.modal-footer button[class*="btn-outline-secondary"]');
      cancelButton.click();
    });
  }));

  it('should navigate to the Authors page when the deletion is confirmed', async(() => {
    component.author = authorWithDeleteLink;
    resourceServiceStub.request.and.returnValue(of(true));
    fixture.detectChanges();
    const deleteButton: HTMLButtonElement = fixture.debugElement
      .query(By.css('button[class*="btn-outline-danger"]'))
      .nativeElement;
    deleteButton.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const confirmButton: HTMLButtonElement = document.querySelector('.modal-footer button[class*="btn-outline-danger"]');
      confirmButton.click();
      fixture.whenStable().then(() => {
        expect(routerStub.navigate).toHaveBeenCalledWith([ 'authors' ]);
      });
    });
  }));

  it('should display an error if the deletion fails', () => {
    component.author = authorWithDeleteLink;
    resourceServiceStub.request.and.returnValue(throwError('Error'));
    fixture.detectChanges();
    const deleteButton: HTMLButtonElement = fixture.debugElement
      .query(By.css('button[class*="btn-outline-danger"]'))
      .nativeElement;
    deleteButton.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const confirmButton: HTMLButtonElement = document.querySelector('.modal-footer button[class*="btn-outline-danger"]');
      confirmButton.click();
      fixture.whenStable().then(() => {
        expect(toastrServiceStub.error).toHaveBeenCalledWith('Error');
      });
    });
  });
});
