import { Subject } from 'rxjs';

import { IProfileDTO } from '../../../interfaces/dtos/ProfileDTO';
import { BookResolver } from './book-resolver.service';

describe('BookResolver', () => {
  let bookResolver: BookResolver;
  let bookServiceStub: { getBook: jasmine.Spy };
  let profileServiceStub: { getProfile: jasmine.Spy };
  let routerStub: { navigate: jasmine.Spy };
  let subject: Subject<IProfileDTO>;

  beforeEach(() => {
    subject = new Subject();
    bookServiceStub = jasmine.createSpyObj('BookService', ['getBook']);
    profileServiceStub = jasmine.createSpyObj('ProfileService', ['getProfile']);
    routerStub = jasmine.createSpyObj('Router', ['navigate']);
    profileServiceStub.getProfile.and.returnValue(subject.asObservable());
    bookResolver = new BookResolver(
      bookServiceStub as any,
      profileServiceStub as any,
      routerStub as any,
    );
  });

  describe('setBook', () => {
    it('should set the underlying book', () => {
      //
    });
  });
});
