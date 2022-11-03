import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Category,
  CategoryDocument,
} from '../schemas/category.schema';
import { Model } from 'mongoose';
import {
  Product,
  ProductDocument,
} from '../schemas/product.schema';

@Injectable()
export class HomepageService {
  // constructor(
  //   @InjectModel(Category.name)
  //   private categoryModel: Model<CategoryDocument>,
  //   @InjectModel(Product.name)
  //   private productModel: Model<ProductDocument>,
  // ) {}
  //
}
