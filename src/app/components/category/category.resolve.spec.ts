import { TestBed, inject } from '@angular/core/testing';

import { CategoryResolve } from './category.resolve';

describe('CategoryResolve', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryResolve]
    });
  });

  it('should be created', inject([CategoryResolve], (service: CategoryResolve) => {
    expect(service).toBeTruthy();
  }));
});
