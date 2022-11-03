import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto';
import { Request } from 'express';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  // ** GET /product
  @Get()
  async products(@Req() req: Request) {
    return this.productService.productsList(req);
  }

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
}
