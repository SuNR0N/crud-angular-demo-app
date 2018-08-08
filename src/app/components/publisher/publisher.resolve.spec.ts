import { TestBed, inject } from '@angular/core/testing';

import { PublisherResolve } from './publisher.resolve';

describe('PublisherResolve', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PublisherResolve]
    });
  });

  it('should be created', inject([PublisherResolve], (service: PublisherResolve) => {
    expect(service).toBeTruthy();
  }));
});
