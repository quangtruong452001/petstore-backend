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

@Schema()
export class Category {
  @Prop()
  name: string;
}

export const CategorySchema =
  SchemaFactory.createForClass(Category);
