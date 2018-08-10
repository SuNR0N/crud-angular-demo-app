import { TestBed, inject } from '@angular/core/testing';

import { BookResolve } from './book.resolve';

describe('BookResolve', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookResolve]
    });
  });

  it('should be created', inject([BookResolve], (service: BookResolve) => {
    expect(service).toBeTruthy();
  }));
});
