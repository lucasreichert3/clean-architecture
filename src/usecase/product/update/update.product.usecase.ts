import ProdutRepositoryInterface from '../../../domain/product/repository/product-repository.interface';
import { InputUpdateProduct, OutputUpdateProduct } from './update.product.dto';

export class UpdateProductUseCase {
  constructor(private productRepository: ProdutRepositoryInterface) {}

  async execute(input: InputUpdateProduct): Promise<OutputUpdateProduct> {
    const { id, name, price } = input;

    const product = await this.productRepository.find(id);

    if (!product) {
      throw new Error('Product not found');
    }

    product.changeName(name);
    product.changePrice(price);

    await this.productRepository.update(product);

    return {
      id: product.id,
      name,
      price,
    };
  }
}
