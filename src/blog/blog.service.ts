import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from '../schemas/blog.schema';
import { Model } from 'mongoose';
import { BlogDto } from './dto/blog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name)
    private blogModel: Model<BlogDocument>,
  ) {}

  async blogs(
    options: any,
    page?: number,
    limit?: number,
    sort?: any,
  ) {
    try {
      const blogs = await this.blogModel
        .find(options)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort(sort)
        .populate('images');
      return blogs;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async blogDetail(id: string) {
    try {
      const blog = await this.blogModel
        .findById(id)
        .populate('images');
      return blog;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async create(blogDto: BlogDto) {
    return await this.blogModel.create(blogDto);
  }
}
