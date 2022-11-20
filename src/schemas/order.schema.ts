import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import {
  Bill,
  BillSchema,
  Cart,
  CartSchema,
} from './common.schema';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true, type: [CartSchema] })
  cart: Cart[];

  @Prop({ required: true, type: BillSchema })
  bill: Bill;

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ required: true })
  shippingFee: number;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment',
  })
  payment: string;
  // 6372f95915aabf9113f9a6e9
  // 6372feda15aabf9113f9a992
  // 6374a2b10a1a169d80f044d2

  @Prop()
  shipping: string;

  @Prop({ required: true })
  confirmStatus: string;
}

export const OrderSchema =
  SchemaFactory.createForClass(Order);
