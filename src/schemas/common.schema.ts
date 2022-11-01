import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';

@Schema()
export class Image {
  @Prop()
  url: string;
}

@Schema({ _id: false })
export class Bill {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  billingAddress: string;

  @Prop()
  postcode: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  orderComment: string;

  @Prop({ required: true })
  paymentMethod: string;
}

@Schema({ _id: false })
export class Cart {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;
}

@Schema({ _id: false })
export class AmountPayment {
  @Prop({ required: true })
  currency_code: string;

  @Prop({ required: true })
  value: string;
}

@Schema({ _id: false })
export class ShippingAddress {
  @Prop()
  country_code: string;

  @Prop()
  address_line_1: string;

  @Prop()
  address_line_2: string;

  @Prop()
  admin_area_2: string;

  @Prop()
  admin_area_1: string;

  @Prop()
  postal_code: string;
}

export const ShippingAddressSchema =
  SchemaFactory.createForClass(ShippingAddress);

@Schema({ _id: false })
export class Shipping {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: ShippingAddressSchema })
  address: object;
}

export const ImageSchema =
  SchemaFactory.createForClass(Image);

export const BillSchema =
  SchemaFactory.createForClass(Bill);

export const CartSchema =
  SchemaFactory.createForClass(Cart);

export const AmountPaymentSchema =
  SchemaFactory.createForClass(AmountPayment);

export const ShippingSchema =
  SchemaFactory.createForClass(Shipping);
