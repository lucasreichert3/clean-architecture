import { CreateProductUseCase } from "./create.product.usecase";

const input = {
  name: 'John Doe',
  price: 100,
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Create product use case test', () => {
  it('should create a product', async () => {
    const productRepository = MockRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const output = {
      id: expect.any(String),
      name: input.name,
      price: input.price,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
});
