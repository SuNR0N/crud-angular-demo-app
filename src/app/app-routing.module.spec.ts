import { Location } from '@angular/common';
import {
  Component,
  NgModule,
  NgModuleFactoryLoader,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  Router,
  RouterModule,
} from '@angular/router';
import {
  RouterTestingModule,
  SpyNgModuleFactoryLoader,
} from '@angular/router/testing';

import { routes } from './app-routing.module';
import { AppComponent } from './app.component';

describe('AppRoutingModule', () => {
  @Component({ template: 'authors' })
  class AuthorsComponent {}

  @NgModule({
    declarations: [ AuthorsComponent ],
    imports: [
      RouterModule.forChild([
        { path: '', component: AuthorsComponent },
      ]),
    ],
  })
  class AuthorsModule {}

  @Component({ template: 'books' })
  class BooksComponent {}

  @NgModule({
    declarations: [ BooksComponent ],
    imports: [
      RouterModule.forChild([
        { path: '', component: BooksComponent },
      ]),
    ],
  })
  class BooksModule {}

  @Component({ template: 'categories' })
  class CategoriesComponent {}

  @NgModule({
    declarations: [ CategoriesComponent ],
    imports: [
      RouterModule.forChild([
        { path: '', component: CategoriesComponent },
      ]),
    ],
  })
  class CategoriesModule {}

  @Component({ template: 'publishers' })
  class PublishersComponent {}

  @NgModule({
    declarations: [ PublishersComponent ],
    imports: [
      RouterModule.forChild([
        { path: '', component: PublishersComponent },
      ]),
    ],
  })
  class PublishersModule {}

  let location: Location;
  let router: Router;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ AppComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
    });

    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(AppComponent);

    const loader: SpyNgModuleFactoryLoader = TestBed.get(NgModuleFactoryLoader);
    loader.stubbedModules = {
      authors: AuthorsModule,
      books: BooksModule,
      categories: CategoriesModule,
      publishers: PublishersModule,
    };

    const routesMock = routes.map((route) => {
      if (route.loadChildren) {
        return {
          ...route,
          loadChildren: route.path,
        };
      } else {
        return route;
      }
    });
    router.resetConfig(routesMock);
  });

  it('should redirect to /books when navigated to ""', fakeAsync(() => {
    router.navigateByUrl('');
    tick();

    expect(location.path()).toBe('/books');
  }));

  it('should load the AuthorsComponent when navigated to /authors', fakeAsync(() => {
    router.navigateByUrl('/authors');
    tick();
    const component: HTMLElement = fixture.debugElement
      .query(By.css('ng-component'))
      .nativeElement;

    expect(component.textContent).toBe('authors');
  }));

  it('should load the BooksComponent when navigated to /books', fakeAsync(() => {
    router.navigateByUrl('/books');
    tick();
    const component: HTMLElement = fixture.debugElement
      .query(By.css('ng-component'))
      .nativeElement;

    expect(component.textContent).toBe('books');
  }));

  it('should load the CategoriesComponent when navigated to /categories', fakeAsync(() => {
    router.navigateByUrl('/categories');
    tick();
    const component: HTMLElement = fixture.debugElement
      .query(By.css('ng-component'))
      .nativeElement;

    expect(component.textContent).toBe('categories');
  }));

  it('should load the PublishersComponent when navigated to /publishers', fakeAsync(() => {
    router.navigateByUrl('/publishers');
    tick();
    const component: HTMLElement = fixture.debugElement
      .query(By.css('ng-component'))
      .nativeElement;

    expect(component.textContent).toBe('publishers');
  }));
});
