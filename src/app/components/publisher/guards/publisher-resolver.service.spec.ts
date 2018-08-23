import { Subject } from 'rxjs';

import { IProfileDTO } from '../../../interfaces/dtos/ProfileDTO';
import { PublisherResolver } from './publisher-resolver.service';

describe('PublisherResolver', () => {
  let publisherResolver: PublisherResolver;
  let publisherServiceStub: { getPublisher: jasmine.Spy };
  let profileServiceStub: { getProfile: jasmine.Spy };
  let routerStub: { navigate: jasmine.Spy };
  let subject: Subject<IProfileDTO>;

  beforeEach(() => {
    subject = new Subject();
    publisherServiceStub = jasmine.createSpyObj('PublisherService', ['getPublisher']);
    profileServiceStub = jasmine.createSpyObj('ProfileService', ['getProfile']);
    routerStub = jasmine.createSpyObj('Router', ['navigate']);
    profileServiceStub.getProfile.and.returnValue(subject.asObservable());
    publisherResolver = new PublisherResolver(
      profileServiceStub as any,
      publisherServiceStub as any,
      routerStub as any,
    );
  });

  describe('setPublisher', () => {
    it('should set the underlying publisher', () => {
      //
    });
  });
});
