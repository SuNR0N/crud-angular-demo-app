import { Subject } from 'rxjs';

import {
  MockProfileService,
  MockPublisherService,
  MockRouter,
} from '../../../../test/mocks/classes';
import { IProfileDTO } from '../../../interfaces/dtos/ProfileDTO';
import { PublisherResolver } from './publisher-resolver.service';

describe('PublisherResolver', () => {
  let publisherResolver: PublisherResolver;
  let publisherServiceMock: MockPublisherService;
  let profileServiceMock: MockProfileService;
  let routerMock: MockRouter;
  let subject: Subject<IProfileDTO>;

  beforeEach(() => {
    subject = new Subject();
    publisherServiceMock = new MockPublisherService();
    profileServiceMock = new MockProfileService();
    routerMock = new MockRouter();
    profileServiceMock.getProfile.and.returnValue(subject.asObservable());
    publisherResolver = new PublisherResolver(
      profileServiceMock as any,
      publisherServiceMock as any,
      routerMock as any,
    );
  });

  describe('setPublisher', () => {
    it('should set the underlying publisher', () => {
      //
    });
  });
});
