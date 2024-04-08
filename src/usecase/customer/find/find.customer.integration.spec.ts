import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../../../infrastructure/customer/repository/sequelize/customer.model';
import CustomerRepository from '../../../infrastructure/customer/repository/sequelize/customer.repository';
import Customer from '../../../domain/costumer/entity/customer';
import Address from '../../../domain/costumer/value-object/address';
import FindCustomerUseCase from './find.customer.usecase';

describe('Test find Customer use case', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should find a customer', async () => {
    const customer = new Customer('123', 'John Doe');
    const address = new Address('Street', 'city', '321', 123);
    customer.changeAddress(address);

    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer);
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
});
