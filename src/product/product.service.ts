import {
  // ForbiddenException,
  Injectable,
} from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
// import { ProductDto } from './dto/product.dto';
import { Model } from 'mongoose';
import {
  Product,
  ProductDocument,
} from '../schemas/product.schema';
import { ProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>, // private config: ConfigService,
  ) {}

  async products(
    options: any,
    page?: number,
    limit?: number,
    sort?: any,
  ) {
    try {
      const products = await this.productModel
        .find(options)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort(sort)
        .populate(['images', 'categories']);
      return products;
    } catch (error) {
      console.log(error);
      throw error;
    }
    // **Find all the product
  }

  async productDetail(id: string) {
    try {
      const product = await this.productModel
        .findById(id)
        .populate(['images', 'categories']);
      return product;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  count(options: any) {
    try {
      return this.productModel.count(options).exec();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async createProduct(productDto: ProductDto) {
    // console.log(productDto);
    return await this.productModel.create(productDto);
  }

  async getTotalProducts() {
    try {
      const totalOrders =
        await this.productModel.countDocuments({});

      return {
        totalOrders,
        statusCode: 200,
      };
    } catch (err) {
      throw err;
    }
  }
}
