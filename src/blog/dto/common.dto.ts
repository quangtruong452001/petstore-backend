import { IsMongoId, IsNotEmpty } from 'class-validator';

export class ImageDto {
  @IsMongoId()
  @IsNotEmpty()
  id: string;

  // @IsString()
  // @IsNotEmpty()
  // url: string;
}
