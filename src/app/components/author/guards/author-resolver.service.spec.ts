import { inject, TestBed } from '@angular/core/testing';

import { AuthorResolver } from './author-resolver.service';

describe('AuthorResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthorResolver],
    });
  });

  it('should be created', inject([AuthorResolver], (service: AuthorResolver) => {
    expect(service).toBeTruthy();
  }));
});
