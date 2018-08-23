import { ICategoryDTO } from '../../../app/interfaces/dtos/CategoryDTO';

export const category: ICategoryDTO = {
  id: 1,
  name: 'Foo',
  _links: {
    self: {
      href: '/api/v1/categories/1',
      method: 'GET',
    },
  },
};
