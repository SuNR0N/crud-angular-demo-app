import { TestBed, inject } from '@angular/core/testing';

import { AuthorResolve } from './author.resolve';

describe('AuthorResolve', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthorResolve]
    });
  });

  it('should be created', inject([AuthorResolve], (service: AuthorResolve) => {
    expect(service).toBeTruthy();
  }));
});
