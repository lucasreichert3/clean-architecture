import ProductFactory from '../../../domain/product/factory/product.factory,';
import { FindProductUsecase } from './find.product.usecase';

const input = {
  id: '1',
};

const product = ProductFactory.createWithId('Product', 100);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Unit Test find Product use case', () => {
  it('should find a product', async () => {
    const productRepository = MockRepository();
    const usecase = new FindProductUsecase(productRepository);

    const output = {
      id: expect.any(String),
      name: 'Product',
      price: 100,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it('should throw an error when product not found', async () => {
    const productRepository = MockRepository();
    productRepository.find = jest.fn().mockReturnValue(Promise.resolve(null));
    const usecase = new FindProductUsecase(productRepository);

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow('Product not found');
  });
});
