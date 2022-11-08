import { Controller, Get } from '@nestjs/common';
import { CategoryService } from '../category/category.service';
import { ProductService } from '../product/product.service';

@Controller('home')
export class HomepageController {
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
  ) {}

  @Get()
  async home() {
    const trendingProducts =
      await this.productService.products({}, 1, 8, {});
    const categories =
      await this.categoryService.categories();
    return {
      trendingProducts: trendingProducts,
      categories: categories,
    };
  }
}
