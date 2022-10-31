import {
  Controller,
  Get,
  Param,
  Req,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Request } from 'express';
import { productQuery, productSort } from '../utils/type';
import {
  handleProductFilters,
  handleProductSorts,
} from '../utils/helper';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  // ** GET /product/all  will add pagination later
  @Get('all')
  getAllProducts() {
    const options = {};
    return this.productService.products(options);
  }

  // ** GET /product/:id
  @Get(':id')
  productDetail(@Param('id') id: string) {
    return this.productService.productDetail(id);
  }

  @Get()
  async products(@Req() req: Request) {
    const options: productQuery = {};
    const sorts: productSort = {};
    const page: number =
      parseInt(req.query.page as any) || 1;
    const limit: number =
      parseInt(req.query.limit as any) || 9;
    if (req.query.s) {
      // query.search (by name)
      options.name = req.query.s.toString();
    }
    if (req.query.categories) {
      // for filter by
      options.categories = req.query.categories.toString();
    }

    if (req.query.orderBy) {
      sorts.orderBy = req.query.orderBy.toString();
    }

    const data = await this.productService.products(
      handleProductFilters(options),
      page,
      limit,
      handleProductSorts(sorts),
    );

    // ** Update sort later

    const total = await this.productService.count(options);

    return {
      data,
      total,
      page,
      last_page: Math.ceil(total / limit),
    };
  }
}
