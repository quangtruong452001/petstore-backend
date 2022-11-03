import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Category,
  CategorySchema,
} from '../schemas/category.schema';
import { HomepageController } from './homepage.controller';
import { HomepageService } from './homepage.service';
import {
  Product,
  ProductSchema,
} from '../schemas/product.schema';
import { CategoryModule } from '../category/category.module';
import { ProductModule } from '../product/product.module';
import { ProductService } from '../product/product.service';
import { CategoryService } from '../category/category.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: Product.name, schema: ProductSchema },
    ]),
    // CategoryModule,
    // ProductModule,
  ],
  controllers: [HomepageController],
  providers: [
    HomepageService,
    ProductService,
    CategoryService,
  ],
})
export class HomepageModule {}
