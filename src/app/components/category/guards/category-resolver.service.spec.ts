import { Subject } from 'rxjs';

import { IProfileDTO } from '../../../interfaces/dtos/ProfileDTO';
import { CategoryResolver } from './category-resolver.service';

describe('CategoryResolver', () => {
  let categoryResolver: CategoryResolver;
  let categoryServiceStub: { getCategory: jasmine.Spy };
  let profileServiceStub: { getProfile: jasmine.Spy };
  let routerStub: { navigate: jasmine.Spy };
  let subject: Subject<IProfileDTO>;

  beforeEach(() => {
    subject = new Subject();
    categoryServiceStub = jasmine.createSpyObj('CategoryService', ['getCategory']);
    profileServiceStub = jasmine.createSpyObj('ProfileService', ['getProfile']);
    routerStub = jasmine.createSpyObj('Router', ['navigate']);
    profileServiceStub.getProfile.and.returnValue(subject.asObservable());
    categoryResolver = new CategoryResolver(
      categoryServiceStub as any,
      profileServiceStub as any,
      routerStub as any,
    );
  });

  describe('setCategory', () => {
    it('should set the underlying category', () => {
      //
    });
  });
});
