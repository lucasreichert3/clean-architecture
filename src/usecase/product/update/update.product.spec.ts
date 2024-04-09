import ProductFactory from '../../../domain/product/factory/product.factory,';
import { UpdateProductUseCase } from './update.product.usecase';

const product = ProductFactory.createWithId('product', 100);

const input = {
  id: product.id,
  name: 'product updated',
  price: 150,
};

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Unit tests for product Update use case', () => {
  it('should update a product', async () => {
    const repository = MockRepository();
    const updateProductUseCase = new UpdateProductUseCase(repository);

    const result = await updateProductUseCase.execute(input);

    expect(result).toEqual(input);
  });

  it('should throw an error when product not found', async () => {
    const repository = MockRepository();
    const updateProductUseCase = new UpdateProductUseCase(repository);

    repository.find = jest.fn().mockReturnValue(Promise.resolve(null));

    await expect(updateProductUseCase.execute(input)).rejects.toThrowError(
      'Product not found'
    );
  });
});
