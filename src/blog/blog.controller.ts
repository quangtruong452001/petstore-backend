import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogDto } from './dto/blog.dto';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get()
  async blogs() {
    return await this.blogService.blogs({}, 1, 9);
  }

  @Post('create')
  async create(@Body() blogDto: BlogDto) {
    return await this.blogService.create(blogDto);
  }

  @Get(':id')
  async blogDetail(@Param('id') id: string) {
    return await this.blogService.blogDetail(id);
  }
}
