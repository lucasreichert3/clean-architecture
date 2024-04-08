import Customer from '../../../domain/costumer/entity/customer';
import Address from '../../../domain/costumer/value-object/address';
import FindCustomerUseCase from './find.customer.usecase';

const customer = new Customer('123', 'John Doe');
const address = new Address('Street', 'city', '321', 123);
customer.changeAddress(address);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Unit Test find Customer use case', () => {
  it('should find a customer', async () => {
    const customerRepository = MockRepository();
    const usecase = new FindCustomerUseCase(customerRepository);

    const input = {
      id: '123',
    };

    const output = {
      id: '123',
      name: 'John Doe',
      address: {
        street: 'Street',
        city: 'city',
        number: 123,
        zip: '321',
      },
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it('should throw an error when customer not found', async () => {
    const customerRepository = MockRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error('Customer not found');
    });
    const usecase = new FindCustomerUseCase(customerRepository);

    const input = {
      id: '123',
    };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow('Customer not found');
  });
});
