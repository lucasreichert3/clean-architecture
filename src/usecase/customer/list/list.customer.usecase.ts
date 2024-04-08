import Customer from '../../../domain/costumer/entity/customer';
import CustomerRepositoryInterface from '../../../domain/costumer/repository/customer-repository.interface';
import { OutputListCustomerDto } from './list.customer.dto';

export default class ListCustomerUseCase {
  private repository: CustomerRepositoryInterface;

  constructor(repository: CustomerRepositoryInterface) {
    this.repository = repository;
  }

  async execute(): Promise<OutputListCustomerDto> {
    const customers = await this.repository.findAll();

    return OutputMapper.toOutput(customers);
  }
}

class OutputMapper {
  static toOutput(customers: Customer[]): OutputListCustomerDto {
    const output = customers.map((customer) => ({
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.Address.street,
        city: customer.Address.city,
        number: customer.Address.number,
        zip: customer.Address.zip,
      },
    }));

    return { customers: output };
  }
}
