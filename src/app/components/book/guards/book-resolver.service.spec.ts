import { inject, TestBed } from '@angular/core/testing';

import { BookResolver } from './book-resolver.service';

describe('BookResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookResolver],
    });
  });

  it('should be created', inject([BookResolver], (service: BookResolver) => {
    expect(service).toBeTruthy();
  }));
});
