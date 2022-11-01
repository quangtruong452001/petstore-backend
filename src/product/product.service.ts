import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDto } from './dto/product.dto';
import { Model, PaginateModel } from 'mongoose';
import {
  Product,
  ProductDocument,
} from '../schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
    private config: ConfigService,
  ) {}

  async products(
    options,
    page?: number,
    limit?: number,
    sort?,
  ) {
    // **Find all the product
    const products = await this.productModel
      .find(options)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sort)
      .populate(['images', 'categories']);

    // const products = await this.productModel.find({});
    // console.log(products);
    return products;
  }

  async productDetail(id: string) {
    const product = await this.productModel
      .findById(id)
      .populate(['images', 'categories']);
    return product;
  }
  count(options) {
    return this.productModel.count(options).exec();
  }
}
