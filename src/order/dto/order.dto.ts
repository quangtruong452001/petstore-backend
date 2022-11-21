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

  @IsMongoId()
  @IsOptional()
  payment: string;

  @IsString()
  @IsOptional()
  shippingTime: string;

  @IsNumber()
  @IsNotEmpty()
  shippingFee: number;

  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;
}

export class OrderUpdateDto {
  @IsMongoId()
  @IsOptional()
  payment: string;

  @IsString()
  @IsOptional()
  status: string;
}
