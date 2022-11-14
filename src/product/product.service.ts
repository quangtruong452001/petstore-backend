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
import { Request } from 'express';
import { productQuery, productSort } from '../utils/type';
import {
  handleProductFilters,
  handleProductSorts,
} from '../utils/helper';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>, // private config: ConfigService,
  ) {}

  // Return list of products with pagination
  async search(
    options: any,
    page?: number,
    limit?: number,
  ) {
    if (page < 0) {
      page = 1;
    }
    if (limit < 0) {
      limit = 9;
    }
    const data = await this.productModel
      .find(options)
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await this.count(options);

    return {
      data,
      total,
      page,
      last_page: Math.ceil(total / limit),
    };
  }

  // Return list of products base on options
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
  }

  // Return a products List and additional information
  async productsList(req: Request) {
    try {
      const options: productQuery = {};
      const sorts: productSort = {};
      let page: number =
        parseInt(req.query.page as any) || 1;
      let limit: number =
        parseInt(req.query.limit as any) || 9;
      if (page < 0) {
        page = 1;
      }
      if (limit < 0) {
        limit = 9;
      }

      // if (req.query.s) {
      //   // query.search (by name)
      //   options.name = req.query.s.toString();
      // }
      if (req.query.categories) {
        // for filter by
        options.categories =
          req.query.categories.toString();
      }

      // ** Sort
      if (req.query.orderBy) {
        sorts.orderBy = req.query.orderBy.toString();
      }

      const data = await this.products(
        handleProductFilters(options),
        page,
        limit,
        handleProductSorts(sorts),
      );

      const minPrice = await this.getPrice('priceAsc');
      const maxPrice = await this.getPrice('priceDesc');
      const total = await this.count(options);

      return {
        data,
        total,
        page,
        last_page: Math.ceil(total / limit),
        minPrice,
        maxPrice,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Return Product details
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

  // Count number of product base on options
  count(options: any) {
    try {
      return this.productModel.count(options).exec();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Create products (POST)
  async createProduct(productDto: ProductDto) {
    // console.log(productDto);
    return await this.productModel.create(productDto);
  }

  // Get number of total products
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

  // Find min, max price
  async getPrice(orderBy) {
    const product = await this.products(
      {},
      1,
      1,
      handleProductSorts({ orderBy }),
    );
    const price = product[0].price;
    return price;
  }

  async similarProducts(options) {
    try {
      const similarProducts = await this.products(
        options,
        1,
        4,
      );
      return similarProducts;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async objectIdArray() {
    try {
      const objectIdArray: any = [];
      const data = await this.productModel.find({});
      for (let i = 0; i < data.length; i++) {
        objectIdArray.push(data[i]._id);
      }
      return objectIdArray;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
