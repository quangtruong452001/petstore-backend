import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  Category,
  CategorySchema,
  Image,
  ImageSchema,
} from './common.schema';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  company: string;

  @Prop()
  city: string;

  @Prop({ required: true })
  country: number;

  @Prop({ required: true })
  address: string;

  @Prop()
  postcode: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;
}

export const OrderSchema =
  SchemaFactory.createForClass(Order);
