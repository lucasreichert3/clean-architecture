import ProdutRepositoryInterface from '../../../domain/product/repository/product-repository.interface';
import { InputFindProductDto, OutputFindProductDto } from './find.product.dto';

export class FindProductUsecase {
  constructor(private readonly productRepository: ProdutRepositoryInterface) {}

  async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
    const product = await this.productRepository.find(input.id);

    if (!product) {
      throw new Error('Product not found');
    }

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
