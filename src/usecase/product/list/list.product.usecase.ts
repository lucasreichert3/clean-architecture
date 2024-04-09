import ProdutRepositoryInterface from '../../../domain/product/repository/product-repository.interface';
import { OutputListProductDto } from './list.product.dto';

export class ListProductUsecase {
  constructor(private readonly productRepository: ProdutRepositoryInterface) {}

  async execute(): Promise<OutputListProductDto> {
    const products = await this.productRepository.findAll();

    return {
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    };
  }
}
