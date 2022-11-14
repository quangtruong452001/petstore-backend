import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ProductService } from '../product/product.service';
import { category } from '../utils/type';

@Controller('categories')
export class CategoryController {
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
  ) {}

  @Get()
  async categories() {
    const categories: any =
      await this.categoryService.categories();
    const results: any = [];
    let category: any;
    for (let i = 0; i < categories.length; i++) {
      category = { ...categories[i]._doc };
      category.totalProducts =
        await this.productService.count({
          categories: category._id,
        });
      results.push({ ...category });
    }
    return results;
  }
}
