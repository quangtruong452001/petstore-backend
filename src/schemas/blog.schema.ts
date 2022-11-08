import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Image } from './common.schema';

export type BlogDocument = Blog & Document;

@Schema()
export class Blog {
  @Prop()
  id: string;
  @Prop({ required: true })
  title: string;
  @Prop({ default: 'Unknown' })
  author: string;
  @Prop({ required: true })
  content: string;
  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
      },
    ],
  })
  images: Image[];
}

export const CategorySchema =
  SchemaFactory.createForClass(Blog);
