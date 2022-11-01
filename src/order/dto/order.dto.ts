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

  @IsMongoId()
  @IsNotEmpty()
  user: string;
}

export class OrderUpdateDto {
  @IsNumber()
  @IsOptional()
  status: number;

  @IsMongoId()
  @IsOptional()
  payment: string;
}
