import { inject, TestBed } from '@angular/core/testing';

import { PublisherResolver } from './publisher-resolver.service';

describe('PublisherResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PublisherResolver],
    });
  });

  it('should be created', inject([PublisherResolver], (service: PublisherResolver) => {
    expect(service).toBeTruthy();
  }));
});
