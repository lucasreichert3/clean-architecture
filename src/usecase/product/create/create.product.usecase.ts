import ProductFactory from '../../../domain/product/factory/product.factory,';
import ProdutRepositoryInterface from '../../../domain/product/repository/product-repository.interface';
import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from './create.product.dto';

export class CreateProductUseCase {
  constructor(private readonly productRepository: ProdutRepositoryInterface) {}

  async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
    const { name, price } = input;
    const product = ProductFactory.createWithId(name, price);

    await this.productRepository.create(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
