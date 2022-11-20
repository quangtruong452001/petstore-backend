import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type imageDocument = Image & Document;

@Schema()
export class Image {
  @Prop()
  id: string;
  @Prop({ required: true })
  image_name: string;
  @Prop({ required: true })
  url: string;
}

export const ImageSchema =
  SchemaFactory.createForClass(Image);
