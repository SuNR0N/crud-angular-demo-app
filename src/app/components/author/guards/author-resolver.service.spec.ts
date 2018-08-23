import {
  Observable,
  of,
  Subject,
} from 'rxjs';

import { author } from '../../../../test/mocks/data/authors.mock';
import {
  IAuthorDTO,
  IProfileDTO,
} from '../../../interfaces/dtos';
import { AuthorResolver } from './author-resolver.service';

describe('AuthorResolver', () => {
  let authorResolver: AuthorResolver;
  let authorServiceStub: { getAuthor: jasmine.Spy };
  let profileServiceStub: { getProfile: jasmine.Spy };
  let routerStub: { navigate: jasmine.Spy };
  let subject: Subject<IProfileDTO>;

  beforeEach(() => {
    subject = new Subject();
    authorServiceStub = jasmine.createSpyObj('AuthorService', ['getAuthor']);
    profileServiceStub = jasmine.createSpyObj('ProfileService', ['getProfile']);
    routerStub = jasmine.createSpyObj('Router', ['navigate']);
    profileServiceStub.getProfile.and.returnValue(subject.asObservable());
    authorResolver = new AuthorResolver(
      authorServiceStub as any,
      profileServiceStub as any,
      routerStub as any,
    );
  });

  describe('setAuthor', () => {
    it('should set the underlying author', () => {
      authorResolver.setAuthor(author);

      expect((authorResolver as any).author).toBe(author);
    });
  });

  describe('resolve', () => {
    let routeStub: {
      paramMap: {
        get: jasmine.Spy,
      },
      params: {
        id: any,
      },
      routeConfig: {
        path: string,
      },
    };

    beforeEach(() => {
      routeStub = {
        paramMap: {
          get: jasmine.createSpy(),
        },
        params: {
          id: author.id,
        },
        routeConfig: {
          path: '',
        },
      };
    });

    it('should call the service if it has no author stored', () => {
      routeStub.paramMap.get.and.returnValue(String(author.id));
      authorServiceStub.getAuthor.and.returnValue(of(author));
      authorResolver.resolve(routeStub as any);

      expect(authorServiceStub.getAuthor).toHaveBeenCalledWith(author.id);
    });

    it('should return the stored author if it matches its id', () => {
      authorResolver.setAuthor(author);
      routeStub.paramMap.get.and.returnValue(String(author.id));
      const expectedAuthor = authorResolver.resolve(routeStub as any);

      expect(expectedAuthor).toBe(author);
      expect(authorServiceStub.getAuthor).not.toHaveBeenCalled();
    });

    it('should call the service if the stored author has a mismatching id', () => {
      const otherAuthor: IAuthorDTO = {
        ...author,
        id: 1,
      };
      authorServiceStub.getAuthor.and.returnValue(of(otherAuthor));
      authorResolver.setAuthor(author);
      routeStub.paramMap.get.and.returnValue('1');
      authorResolver.resolve(routeStub as any);

      expect(authorServiceStub.getAuthor).toHaveBeenCalledWith(1);
    });

    it('should call the service if the stored author gets cleared', () => {
      authorResolver.setAuthor(author);
      routeStub.paramMap.get.and.returnValue(String(author.id));
      authorServiceStub.getAuthor.and.returnValue(of(author));
      subject.next(null);
      authorResolver.resolve(routeStub as any);

      expect(authorServiceStub.getAuthor).toHaveBeenCalledWith(author.id);
    });

    it('should return the fetched author if the service was called', () => {
      routeStub.paramMap.get.and.returnValue(String(author.id));
      authorServiceStub.getAuthor.and.returnValue(of(author));
      let expectedAuthor: IAuthorDTO;
      (<Observable<IAuthorDTO>>authorResolver.resolve(routeStub as any)).subscribe(
        (value) => expectedAuthor = value,
      );

      expect(expectedAuthor).toBe(author);
    });

    it('should return null and navigate back if the route matches the edit path but the author has no update link', () => {
      routeStub.paramMap.get.and.returnValue(String(author.id));
      authorServiceStub.getAuthor.and.returnValue(of(author));
      routeStub.routeConfig.path = ':id/edit';
      let expectedAuthor: IAuthorDTO;
      (<Observable<IAuthorDTO>>authorResolver.resolve(routeStub as any)).subscribe(
        (value) => expectedAuthor = value,
      );

      expect(expectedAuthor).toBeNull();
      expect(routerStub.navigate).toHaveBeenCalledWith([ 'authors', author.id ]);
    });
  });
});
