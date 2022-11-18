import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { BillDto, CartDto } from './common.dto';

export class OrderDto {
  @ValidateNested()
  @Type(() => BillDto)
  bill: BillDto;

  @ValidateNested()
  @IsArray()
  @Type(() => CartDto)
  cart: CartDto[];

  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

  @IsNumber()
  @IsNotEmpty()
  shippingFee: number;

  @IsMongoId()
  @IsOptional()
  payment: string;

  @IsString()
  @IsOptional()
  shipping: string;
}

export class OrderUpdateDto {
  @IsMongoId()
  @IsOptional()
  payment: string;

  @IsString()
  @IsOptional()
  shipping: string;
}
