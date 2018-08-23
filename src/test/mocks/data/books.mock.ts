import { IBookDTO } from '../../../app/interfaces/dtos/BookDTO';

export const book: IBookDTO = {
  authors: [
    'John Doe',
    'Jane Doe',
  ],
  categories: [
    'Category #1',
    'Category #2',
  ],
  id: 1,
  isbn10: '1234567890',
  isbn13: '1234567890123',
  publicationDate: '2001-02-03',
  publishers: [
    'FooBar',
  ],
  title: 'Foo',
  _links: {
    self: {
      href: '/api/v1/books/1',
      method: 'GET',
    },
  },
};
