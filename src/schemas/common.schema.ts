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

export const ImageSchema =
  SchemaFactory.createForClass(Image);
