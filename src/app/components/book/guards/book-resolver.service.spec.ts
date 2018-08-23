import { Subject } from 'rxjs';

import {
  MockBookService,
  MockProfileService,
  MockRouter,
} from '../../../../test/mocks/classes';
import { IProfileDTO } from '../../../interfaces/dtos/ProfileDTO';
import { BookResolver } from './book-resolver.service';

describe('BookResolver', () => {
  let bookResolver: BookResolver;
  let bookServiceMock: MockBookService;
  let profileServiceMock: MockProfileService;
  let routerMock: MockRouter;
  let subject: Subject<IProfileDTO>;

  beforeEach(() => {
    subject = new Subject();
    bookServiceMock = new MockBookService();
    profileServiceMock = new MockProfileService();
    routerMock = new MockRouter();
    profileServiceMock.getProfile.and.returnValue(subject.asObservable());
    bookResolver = new BookResolver(
      bookServiceMock as any,
      profileServiceMock as any,
      routerMock as any,
    );
  });

  describe('setBook', () => {
    it('should set the underlying book', () => {
      //
    });
  });
});
