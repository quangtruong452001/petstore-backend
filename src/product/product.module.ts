import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Product,
  ProductSchema,
} from '../schemas/product.schema';
import {
  Image,
  ImageSchema,
} from '../schemas/image.schema';
import {
  Category,
  CategorySchema,
} from '../schemas/category.schema';
import { ImageService } from '../image/image.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Image.name, schema: ImageSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService, ImageService],
})
export class ProductModule {}
