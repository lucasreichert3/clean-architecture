import CreateCustomerUseCase from './create.customer.usecase';

const input = {
  name: 'John Doe',
  address: {
    street: 'Street',
    city: 'city',
    zip: '321',
    number: 123,
  },
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Unit Test create Customer use case', () => {
  it('should create a customer', async () => {
    const customerRepository = MockRepository();
    const usecase = new CreateCustomerUseCase(customerRepository);

    const output = {
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        city: input.address.city,
        number: input.address.number,
        zip: input.address.zip,
      },
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it('should throw an error when name is missing', async () => {
    const customerRepository = MockRepository();
    const usecase = new CreateCustomerUseCase(customerRepository);

    await expect(usecase.execute({ ...input, name: '' })).rejects.toThrow(
      'Name is required'
    );
  });

  it('should throw an error when street is missing', async () => {
    const customerRepository = MockRepository();
    const usecase = new CreateCustomerUseCase(customerRepository);

    await expect(
      usecase.execute({ ...input, address: { ...input.address, street: '' } })
    ).rejects.toThrow('Street is required');
  });
});
