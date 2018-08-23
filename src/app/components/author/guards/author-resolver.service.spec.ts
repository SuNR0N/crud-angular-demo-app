import {
  Observable,
  of,
  Subject,
} from 'rxjs';

import {
  MockActivatedRouteSnapshot,
  MockAuthorService,
  MockProfileService,
  MockRouter,
} from '../../../../test/mocks/classes';
import { author } from '../../../../test/mocks/data/authors.mock';
import {
  IAuthorDTO,
  IProfileDTO,
} from '../../../interfaces/dtos';
import { AuthorResolver } from './author-resolver.service';

describe('AuthorResolver', () => {
  let authorResolver: AuthorResolver;
  let authorServiceMock: MockAuthorService;
  let profileServiceMock: MockProfileService;
  let routerMock: MockRouter;
  let subject: Subject<IProfileDTO>;

  beforeEach(() => {
    subject = new Subject();
    authorServiceMock = new MockAuthorService();
    profileServiceMock = new MockProfileService();
    routerMock = new MockRouter();
    profileServiceMock.getProfile.and.returnValue(subject.asObservable());
    authorResolver = new AuthorResolver(
      authorServiceMock as any,
      profileServiceMock as any,
      routerMock as any,
    );
  });

  describe('setAuthor', () => {
    it('should set the underlying author', () => {
      authorResolver.setAuthor(author);

      expect((authorResolver as any).author).toBe(author);
    });
  });

  describe('resolve', () => {
    let routeMock: MockActivatedRouteSnapshot;

    beforeEach(() => {
      routeMock = new MockActivatedRouteSnapshot({
        paramMap: { id: String(author.id )},
        params: { id: author.id },
        routeConfig: { path: '' },
      });
    });

    it('should call the service if it has no author stored', () => {
      authorServiceMock.getAuthor.and.returnValue(of(author));
      authorResolver.resolve(routeMock as any);

      expect(authorServiceMock.getAuthor).toHaveBeenCalledWith(author.id);
    });

    it('should return the stored author if it matches its id', () => {
      authorResolver.setAuthor(author);
      const expectedAuthor = authorResolver.resolve(routeMock as any);

      expect(expectedAuthor).toBe(author);
      expect(authorServiceMock.getAuthor).not.toHaveBeenCalled();
    });

    it('should call the service if the stored author has a mismatching id', () => {
      const otherAuthor: IAuthorDTO = {
        ...author,
        id: 1,
      };
      authorServiceMock.getAuthor.and.returnValue(of(otherAuthor));
      authorResolver.setAuthor(author);
      routeMock.testParamMap = { id: '1' };
      authorResolver.resolve(routeMock as any);

      expect(authorServiceMock.getAuthor).toHaveBeenCalledWith(1);
    });

    it('should call the service if the stored author gets cleared', () => {
      authorResolver.setAuthor(author);
      authorServiceMock.getAuthor.and.returnValue(of(author));
      subject.next(null);
      authorResolver.resolve(routeMock as any);

      expect(authorServiceMock.getAuthor).toHaveBeenCalledWith(author.id);
    });

    it('should return the fetched author if the service was called', () => {
      authorServiceMock.getAuthor.and.returnValue(of(author));
      let expectedAuthor: IAuthorDTO;
      (<Observable<IAuthorDTO>>authorResolver.resolve(routeMock as any)).subscribe(
        (value) => expectedAuthor = value,
      );

      expect(expectedAuthor).toBe(author);
    });

    it('should return null and navigate back if the route matches the edit path but the author has no update link', () => {
      authorServiceMock.getAuthor.and.returnValue(of(author));
      routeMock.testRouteConfig = { path: ':id/edit' };
      let expectedAuthor: IAuthorDTO;
      (<Observable<IAuthorDTO>>authorResolver.resolve(routeMock as any)).subscribe(
        (value) => expectedAuthor = value,
      );

      expect(expectedAuthor).toBeNull();
      expect(routerMock.navigate).toHaveBeenCalledWith([ 'authors', author.id ]);
    });
  });
});
