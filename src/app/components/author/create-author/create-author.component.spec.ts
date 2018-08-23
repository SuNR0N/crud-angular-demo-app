import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import {
  of,
  throwError,
} from 'rxjs';

import { SharedModule } from '../../../shared.module';
import { CreateAuthorComponent } from './create-author.component';

describe('CreateAuthorComponent', () => {
  let component: CreateAuthorComponent;
  let fixture: ComponentFixture<CreateAuthorComponent>;
  let toastrServiceStub: { error: jasmine.Spy };

  beforeEach(async(() => {
    toastrServiceStub = jasmine.createSpyObj('ToastrService', ['error']);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule,
      ],
      declarations: [ CreateAuthorComponent ],
      providers: [
        { provide: ToastrService, useValue: toastrServiceStub },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
  });

  it('should have a disabled Save button by default', () => {
    const saveButton: HTMLButtonElement = fixture.debugElement
      .query(By.css('button[type="submit"]'))
      .nativeElement;

    expect(saveButton.disabled).toBeTruthy();
  });

  it('should have an enabled Save button when the form is valid', () => {
    component.createAuthorForm.controls['firstName'].setValue('John');
    component.createAuthorForm.controls['lastName'].setValue('Doe');
    fixture.detectChanges();
    const saveButton: HTMLButtonElement = fixture.debugElement
      .query(By.css('button[type="submit"]'))
      .nativeElement;

    expect(saveButton.disabled).toBeFalsy();
  });

  it('should navigate to the List page when the Cancel button is clicked', () => {
    const cancelButton: HTMLButtonElement = fixture.debugElement
      .query(By.css('button[class*="btn-outline-secondary"]'))
      .nativeElement;
    const navigateSpy = spyOn((component as any).router, 'navigate');
    cancelButton.click();

    expect(navigateSpy).toHaveBeenCalledWith([ 'authors' ]);
  });

  it('should navigate to the List page when the new author is created', () => {
    spyOn((component as any).authorService, 'createAuthor').and.returnValue(of(1));
    const navigateSpy = spyOn((component as any).router, 'navigate');
    component.createAuthorForm.controls['firstName'].setValue('John');
    component.createAuthorForm.controls['lastName'].setValue('Doe');
    fixture.detectChanges();
    const saveButton: HTMLButtonElement = fixture.debugElement
      .query(By.css('button[type="submit"]'))
      .nativeElement;
    saveButton.click();

    expect(navigateSpy).toHaveBeenCalledWith([ 'authors' ]);
  });

  it('should raise a toastr error if the service call fails', () => {
    spyOn((component as any).authorService, 'createAuthor').and.returnValue(throwError('Error'));
    component.createAuthorForm.controls['firstName'].setValue('John');
    component.createAuthorForm.controls['lastName'].setValue('Doe');
    fixture.detectChanges();
    const saveButton: HTMLButtonElement = fixture.debugElement
      .query(By.css('button[type="submit"]'))
      .nativeElement;
    saveButton.click();

    expect(toastrServiceStub.error).toHaveBeenCalledWith('Error');
  });
});
