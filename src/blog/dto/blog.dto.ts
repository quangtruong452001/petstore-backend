import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  //ValidateNested,
} from 'class-validator';
import { ImageDto } from './common.dto';

export class BlogDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10, {
    message: 'Title is too short',
  })
  title: string;

  @IsString()
  @IsOptional()
  author: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(25, {
    message: 'Your content is too short',
  })
  content: string;

  @IsArray()
  @Type(() => ImageDto)
  images: ImageDto[];
}
