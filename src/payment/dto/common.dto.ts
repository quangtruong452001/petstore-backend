import {
  IsNotEmpty,
  IsObject,
  IsString,
} from 'class-validator';

export class AmountPayment {
  @IsString()
  @IsNotEmpty()
  currency_code: string;

  @IsString()
  @IsNotEmpty()
  value: string;
}

export class Shipping {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsObject()
  @IsNotEmpty()
  address: {
    country_code: string;
    address_line_1: string;
    address_line_2: string;
    admin_area_2: string;
    admin_area_1: string;
    postal_code: string;
  };
}
