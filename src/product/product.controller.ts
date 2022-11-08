import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
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

  // ** Test vs debug search
  @Get('search')
  search(
    @Query('s') option: any,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.productService.search(
      option,
      page ? page : 1,
      limit ? limit : 9,
    );
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

  // **GET /product/array
  @Get('listId')
  async objectIdArray() {
    return this.productService.objectIdArray();
  }

  // ** GET /product/:id

  @Get(':id')
  async productDetail(@Param('id') id: string) {
    const productDetail: any =
      await this.productService.productDetail(id);
    const categories = productDetail.categories[0]._id;

    const similarProducts =
      await this.productService.similarProducts({
        categories: categories,
      });

    return {
      productDetail: {
        ...productDetail['_doc'],
        similarProducts: similarProducts,
      },
      // similarProducts: similarProducts,
    };
  }
}
