import CustomerFactory from '../../../domain/costumer/factory/customer.factory';
import CustomerRepositoryInterface from '../../../domain/costumer/repository/customer-repository.interface';
import Address from '../../../domain/costumer/value-object/address';
import {
  InputCreateCustomerDto,
  OutputCreateCustomerDto,
} from './create.customer.dto';
import { v4 as uuid } from 'uuid';

export default class CreateCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(
    input: InputCreateCustomerDto
  ): Promise<OutputCreateCustomerDto> {
    const { city, number, street, zip } = input.address;
    const customer = CustomerFactory.createWithAddress(
      input.name,
      new Address(street, city, zip, number)
    );

    await this.customerRepository.create(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.Address.street,
        city: customer.Address.city,
        number: customer.Address.number,
        zip: customer.Address.zip,
      },
    };
  }
}
