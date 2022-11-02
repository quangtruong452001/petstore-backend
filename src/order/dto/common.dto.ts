import {
  IsNotEmpty,
  IsInt,
  IsString,
  IsNumber,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class BillDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  company: string;

  @IsString()
  @IsNotEmpty()
  region: string;

  @IsString()
  @IsNotEmpty()
  district: string;

  @IsString()
  @IsOptional()
  ward: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  orderComment: string;

  @IsString()
  @IsNotEmpty()
  paymentMethod: string;
}

export class CartDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsInt()
  @IsNotEmpty()
  quantity: number;
}
