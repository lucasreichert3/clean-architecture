import ProductFactory from '../../../domain/product/factory/product.factory,';
import { ListProductUsecase } from './list.product.usecase';

const product = ProductFactory.createWithId('Product', 100);
const product2 = ProductFactory.createWithId('Product 2', 150);

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product, product2])),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Unit Test list Product use case', () => {
  it('should list all products', async () => {
    const productRepository = MockRepository();
    const usecase = new ListProductUsecase(productRepository);

    const output = {
      products: [
        {
          id: expect.any(String),
          name: 'Product',
          price: 100,
        },
        {
          id: expect.any(String),
          name: 'Product 2',
          price: 150,
        },
      ],
    };

    const result = await usecase.execute();

    expect(result).toEqual(output);
  });
});
