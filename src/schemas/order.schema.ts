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

  @Prop({ required: true })
  shippingTime: string;

  @Prop({ required: true })
  shippingFee: number;

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ required: true })
  status: string;
}

export const OrderSchema =
  SchemaFactory.createForClass(Order);
