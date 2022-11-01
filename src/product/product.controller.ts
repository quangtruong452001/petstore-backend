import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Request } from 'express';
import { productQuery, productSort } from '../utils/type';
import {
  handleProductFilters,
  handleProductSorts,
} from '../utils/helper';
import { ProductDto } from './dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  // ** POST /product/create
  @Post('create')
  createProduct(@Body() productDto: ProductDto) {
    // console.log(productDto);
    return this.productService.createProduct(productDto);
  }

  // ** GET /product/all  will add pagination later
  @Get('all')
  getAllProducts() {
    const options = {};
    return this.productService.products(options);
  }

  // ** GET /product/total
  @Get('total')
  async totalNumber() {
    return this.productService.getTotalProducts();
  }

  // ** GET /product/:id
  @Get(':id')
  productDetail(@Param('id') id: string) {
    return this.productService.productDetail(id);
  }

  // ** GET /product
  @Get()
  async products(@Req() req: Request) {
    const options: productQuery = {};
    const sorts: productSort = {};
    let page: number = parseInt(req.query.page as any) || 1;
    let limit: number =
      parseInt(req.query.limit as any) || 9;
    if (page < 0) {
      page = 1;
    }
    if (limit < 0) {
      limit = 9;
    }

    if (req.query.s) {
      // query.search (by name)
      options.name = req.query.s.toString();
    }
    if (req.query.categories) {
      // for filter by
      options.categories = req.query.categories.toString();
    }

    // ** Sort
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
