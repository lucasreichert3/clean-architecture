import CustomerFactory from '../../../domain/costumer/factory/customer.factory';
import Address from '../../../domain/costumer/value-object/address';
import UpdateCustomerUseCase from './update.customer.usecase';

const customer = CustomerFactory.createWithAddress(
  'John Doe',
  new Address('street', 'city', 'zip', 1)
);

const input = {
  id: customer.id,
  name: 'John Updated',
  address: {
    street: 'street updated',
    city: 'city updated',
    number: 2,
    zip: 'zip updated',
  },
};

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Unit tests for customer Update use case', () => {
  it('should update a customer', async () => {
    const repository = MockRepository();
    const updateCustomerUseCase = new UpdateCustomerUseCase(repository);

    const result = await updateCustomerUseCase.execute(input);

    expect(result).toEqual(input);
  });
});
