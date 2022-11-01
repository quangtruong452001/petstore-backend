import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import {
  AmountPaymentSchema,
  ShippingSchema,
} from './common.schema';

export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true })
export class Payment {
  @Prop({ required: true })
  paymentId: string;

  @Prop({ required: true, type: AmountPaymentSchema })
  amount: object;

  @Prop({ required: true, type: ShippingSchema })
  shipping: object;

  @Prop({ required: true })
  type: string;

  @Prop()
  description: string;
}

export const PaymentSchema =
  SchemaFactory.createForClass(Payment);
