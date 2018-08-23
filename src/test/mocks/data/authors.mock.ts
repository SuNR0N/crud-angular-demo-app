import { IAuthorDTO } from '../../../app/interfaces/dtos/AuthorDTO';

export const author: IAuthorDTO = {
  id: 1337,
  firstName: 'John',
  fullName: 'John X. Doe',
  lastName: 'Doe',
  middleName: 'X.',
  _links: {
    self: {
      href: '/api/v1/authors/1337',
      method: 'GET',
    },
  },
};

export const authorWithoutSelfLink = {
  ...author,
  _links: {},
} as IAuthorDTO;

export const authorWithDeleteLink: IAuthorDTO = {
  ...author,
  _links: {
    ...author._links,
    delete: {
      href: '/api/v1/authors/1',
      method: 'DELETE',
    },
  },
};

export const authorWithUpdateLink: IAuthorDTO = {
  ...author,
  _links: {
    ...author._links,
    update: {
      href: '/api/v1/authors/1',
      method: 'PATCH',
    },
  },
};
