import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  //ValidateNested,
} from 'class-validator';
import { CategoryDto, ImageDto } from './common.dto';

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsOptional()
  shortDescription: string;

  @IsString()
  @IsOptional()
  additionalInfos: string;

  @IsString()
  @IsOptional()
  productCode: string;

  @IsString()
  @IsOptional()
  productSKU: string;

  @IsArray()
  @Type(() => ImageDto)
  images: ImageDto[];

  @IsArray()
  @Type(() => CategoryDto)
  categories: CategoryDto[];
}

export class ProductUpdateDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  price: number;

  @IsString()
  @IsOptional()
  shortDescription: string;

  @IsString()
  @IsOptional()
  additionalInfos: string;

  @IsString()
  @IsOptional()
  productCode: string;

  @IsString()
  @IsOptional()
  productSKU: string;

  @IsOptional()
  @IsArray()
  @Type(() => ImageDto)
  images: ImageDto[];

  @IsOptional()
  @IsArray()
  @Type(() => CategoryDto)
  categories: CategoryDto[];
}
