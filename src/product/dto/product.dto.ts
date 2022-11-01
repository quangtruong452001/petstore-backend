import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
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
  shortDescription: string;

  @IsString()
  additionalInfos: string;

  productCode: string;

  productSku: string;

  @ValidateNested()
  @IsArray()
  @Type(() => ImageDto)
  images: ImageDto[];

  @ValidateNested()
  @IsArray()
  @Type(() => CategoryDto)
  categories: CategoryDto[];
}
