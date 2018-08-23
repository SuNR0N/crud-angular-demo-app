import { Subject } from 'rxjs';

import {
  MockCategoryService,
  MockProfileService,
  MockRouter,
} from '../../../../test/mocks/classes';
import { IProfileDTO } from '../../../interfaces/dtos/ProfileDTO';
import { CategoryResolver } from './category-resolver.service';

describe('CategoryResolver', () => {
  let categoryResolver: CategoryResolver;
  let categoryServiceMock: MockCategoryService;
  let profileServiceMock: MockProfileService;
  let routerMock: MockRouter;
  let subject: Subject<IProfileDTO>;

  beforeEach(() => {
    subject = new Subject();
    categoryServiceMock = new MockCategoryService();
    profileServiceMock = new MockProfileService();
    routerMock = new MockRouter();
    profileServiceMock.getProfile.and.returnValue(subject.asObservable());
    categoryResolver = new CategoryResolver(
      categoryServiceMock as any,
      profileServiceMock as any,
      routerMock as any,
    );
  });

  describe('setCategory', () => {
    it('should set the underlying category', () => {
      //
    });
  });
});
