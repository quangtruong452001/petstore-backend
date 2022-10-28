import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import {
  Category,
  CategorySchema,
  Image,
  ImageSchema,
} from './common.schema';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  productCode: string;

  @Prop({ required: true })
  productSku: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  description: string;

  @Prop()
  shortDescription: string;

  @Prop()
  additionalInfos: string;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
      },
    ],
  })
  images: Image[];

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
  })
  categories: Category[];
}

export const ProductSchema =
  SchemaFactory.createForClass(Product);
