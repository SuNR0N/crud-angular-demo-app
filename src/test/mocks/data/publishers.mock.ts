import { IPublisherDTO } from '../../../app/interfaces/dtos/PublisherDTO';

export const publisher: IPublisherDTO = {
  id: 1,
  name: 'Foo',
  _links: {
    self: {
      href: '/api/v1/publishers/1',
      method: 'GET',
    },
  },
};
