import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
  author,
  authorWithDeleteLink,
  authorWithoutSelfLink,
  authorWithUpdateLink,
} from '../../../../test/mocks/data/authors.mock';
import { IAuthorDTO } from '../../../interfaces/dtos/AuthorDTO';
import { SharedModule } from '../../../shared.module';
import { AuthorRowComponent } from './author-row.component';

describe('AuthorRowComponent', () => {
  let component: AuthorRowComponent;
  let fixture: ComponentFixture<AuthorRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule.forRoot(),
        RouterTestingModule,
        SharedModule,
      ],
      declarations: [ AuthorRowComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorRowComponent);
    component = fixture.componentInstance;
    component.author = author;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the id of the author', () => {
    const idCell: HTMLElement = fixture.debugElement
      .queryAll(By.css('td'))[0]
      .nativeElement;

    expect(idCell.textContent).toBe('1337');
  });

  it('should display the full name of the author', () => {
    const fullNameCell: HTMLElement = fixture.debugElement
      .queryAll(By.css('td'))[1]
      .nativeElement;

    expect(fullNameCell.textContent).toBe('John X. Doe');
  });

  it('should display the first name of the author', () => {
    const firstNameCell: HTMLElement = fixture.debugElement
      .queryAll(By.css('td'))[2]
      .nativeElement;

    expect(firstNameCell.textContent).toBe('John');
  });

  it('should display the middle name of the author', () => {
    const middleNameCell: HTMLElement = fixture.debugElement
      .queryAll(By.css('td'))[3]
      .nativeElement;

    expect(middleNameCell.textContent).toBe('X.');
  });

  it('should display the last name of the author', () => {
    const lastNameCell: HTMLElement = fixture.debugElement
      .queryAll(By.css('td'))[4]
      .nativeElement;

    expect(lastNameCell.textContent).toBe('Doe');
  });

  it('should display the View action button if the "self" link exists', () => {
    const viewButton = fixture.debugElement
      .queryAll(By.css('td'))[5]
      .query(By.css('button[symbol="eye-regular"]'));

    expect(viewButton).toBeTruthy();
  });

  it('should not display the View action button if the "self" link does not exist', () => {
    component.author = authorWithoutSelfLink;
    fixture.detectChanges();
    const viewButton = fixture.debugElement
      .queryAll(By.css('td'))[5]
      .query(By.css('button[symbol="eye-regular"]'));

    expect(viewButton).toBeFalsy();
  });

  it('should display the Edit action button if the "update" link exists', () => {
    component.author = authorWithUpdateLink;
    fixture.detectChanges();
    const editButton = fixture.debugElement
      .queryAll(By.css('td'))[5]
      .query(By.css('button[symbol="edit-regular"]'));

    expect(editButton).toBeTruthy();
  });

  it('should not display the Edit action button if the "update" link does not exist', () => {
    const editButton = fixture.debugElement
      .queryAll(By.css('td'))[5]
      .query(By.css('button[symbol="edit-regular"]'));

    expect(editButton).toBeFalsy();
  });

  it('should display the Delete action button if the "delete" link exists', () => {
    component.author = authorWithDeleteLink;
    fixture.detectChanges();
    const deleteButton = fixture.debugElement
      .queryAll(By.css('td'))[5]
      .query(By.css('button[symbol="trash-alt-regular"]'));

    expect(deleteButton).toBeTruthy();
  });

  it('should not display the Delete action button if the "delete" link does not exist', () => {
    const deleteButton = fixture.debugElement
      .queryAll(By.css('td'))[5]
      .query(By.css('button[symbol="trash-alt-regular"]'));

    expect(deleteButton).toBeFalsy();
  });

  it('should navigate to the View page when the View action button is clicked', () => {
    const viewButton = fixture.debugElement
      .queryAll(By.css('td'))[5]
      .query(By.css('button[symbol="eye-regular"]'));
    const navigateSpy = spyOn((component as any).router, 'navigate');
    viewButton.triggerEventHandler('click', null);

    expect(navigateSpy).toHaveBeenCalledWith([ 'authors', 1337 ]);
  });

  it('should navigate to the Edit page when the Edit action button is clicked', () => {
    component.author = authorWithUpdateLink;
    fixture.detectChanges();
    const editButton = fixture.debugElement
      .queryAll(By.css('td'))[5]
      .query(By.css('button[symbol="edit-regular"]'));
    const navigateSpy = spyOn((component as any).router, 'navigate');
    editButton.triggerEventHandler('click', null);

    expect(navigateSpy).toHaveBeenCalledWith([ 'authors', 1337, 'edit' ]);
  });

  it('should display a modal displaying the full name of the author when the Delete button is clicked', async(() => {
    component.author = authorWithDeleteLink;
    fixture.detectChanges();
    const deleteButton = fixture.debugElement
      .queryAll(By.css('td'))[5]
      .query(By.css('button[symbol="trash-alt-regular"]'));
    deleteButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const modalBody = document.querySelector('.modal-body');
      expect(modalBody.textContent.trim()).toMatch(/^Are you sure you want to delete John X\. Doe.\(ID: 1337\) \?$/);
      const cancelButton: HTMLButtonElement = document.querySelector('.modal-footer button[class*="btn-outline-secondary"]');
      cancelButton.click();
    });
  }));

  it('should emit a delete event when the deletion is confirmed', async(() => {
    component.author = authorWithDeleteLink;
    fixture.detectChanges();
    const deleteButton = fixture.debugElement
      .queryAll(By.css('td'))[5]
      .query(By.css('button[symbol="trash-alt-regular"]'));
    deleteButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    let expectedAuthor: IAuthorDTO | undefined;
    component.delete.subscribe((value) => expectedAuthor = value);
    fixture.whenStable().then(() => {
      const confirmButton: HTMLButtonElement = document.querySelector('.modal-footer button[class*="btn-outline-danger"]');
      confirmButton.click();
      fixture.whenStable().then(() => {
        expect(expectedAuthor).toBe(authorWithDeleteLink);
      });
    });
  }));
});
