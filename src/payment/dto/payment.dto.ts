import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class PaymentDto {
  @IsString()
  @IsNotEmpty()
  externalId: string;

  @IsString()
  @IsNotEmpty()
  payerFistName: string;

  @IsString()
  @IsNotEmpty()
  payerLastName: string;

  @IsString()
  @IsNotEmpty()
  currencyCode: string;

  @IsString()
  @IsNotEmpty()
  totalAmount: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}

export class PaymentUpdateDto {
  @IsString()
  @IsOptional()
  description: string;
}
