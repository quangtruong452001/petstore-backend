import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Product,
  ProductSchema,
} from '../schemas/product.schema';
import {
  Image,
  ImageSchema,
} from '../schemas/common.schema';
import {
  Category,
  CategorySchema,
} from '../schemas/category.schema';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { ProductService } from '../product/product.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, ProductService],
})
export class CategoryModule {}
