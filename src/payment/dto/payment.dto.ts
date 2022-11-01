import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AmountPayment, Shipping } from './common.dto';

export class PaymentDto {
  @IsString()
  @IsNotEmpty()
  paymentId: string;

  @ValidateNested()
  @Type(() => AmountPayment)
  amount: AmountPayment;

  @ValidateNested()
  @Type(() => Shipping)
  shipping: Shipping;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}

export class PaymentUpdateDto {
  @IsString()
  @IsOptional()
  description: string;
}
