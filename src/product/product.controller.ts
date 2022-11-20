import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto';
import { Request } from 'express';
import { ImageService } from '../image/image.service';
import {
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';

@Controller('product')
export class ProductController {
  constructor(
    private productService: ProductService,
    private imageService: ImageService,
  ) {}

  // ** GET /product
  @Get()
  async products(@Req() req: Request) {
    return this.productService.productsList(req);
  }

  // ** Test vs debug search
  @Get('search')
  async search(
    @Query('s') option: any,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const reg = new RegExp(option, 'i');
    const options = {
      name: reg,
    };
    return await this.productService.search(
      options,
      page ? page : 1,
      limit ? limit : 9,
    );
  }

  // ** POST /product/create
  @Post('create')
  @UseInterceptors(FilesInterceptor('images'))
  async createProduct(
    @Req() req: Request,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const newProduct: any = req.body.newProduct
      ? JSON.parse(req.body.newProduct)
      : {
          name: req.body.name,
          price: parseFloat(req.body.price),
          productCode: req.body.productCode,
          categories: req.body.categories,
          description: req.body.description,
          shortDescription: req.body.shortDescription,
          productSKU: req.body.productSKU,
          additionalInfos: req.body.additionalInfos,
        };
    // console.log(files);
    // ** Upload file to firebase
    const fileList = await this.imageService.uploadImages(
      files,
    );
    // console.log(fileList);
    // ** Save images url to our mongoDB collections
    let imgs = [];
    for (let i = 0; i < fileList.length; i++) {
      const img = fileList[i];
      const image = await this.imageService.createImage(
        img,
      );
      imgs.push(image.id);
    }
    // console.log(images);
    // ** Get array of image's id and add to our product
    newProduct.images = imgs;
    return this.productService.createProduct(newProduct);
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
