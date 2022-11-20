import { Injectable } from '@nestjs/common';
import { firebase } from '../utils/firebase/firebase';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { convertToSlug } from '../utils/helper';
import { InjectModel } from '@nestjs/mongoose';
import {
  imageDocument,
  Image,
} from '../schemas/image.schema';
import { Model } from 'mongoose';
import { imageDto } from '../dto/image.dto';

@Injectable()
export class ImageService {
  constructor(
    @InjectModel(Image.name)
    private imageModel: Model<imageDocument>,
  ) {}

  async createImage(image: imageDto) {
    const img = await this.imageModel.create(image);
    return img;
  }

  async uploadImage(file: Express.Multer.File) {
    const storage = getStorage(firebase);
    const imageRef = ref(storage, file.originalname);
    const name = file.originalname.split('.')[0];
    const type = file.originalname.split('.')[1];
    const metadata: any = {};
    if (type == 'png') {
      metadata.contentType = 'image/png';
    }
    if (type == 'jpg') {
      metadata.contentType = 'jpg/png';
    }
    await uploadBytes(imageRef, file.buffer, metadata);
    const downloadURL = await getDownloadURL(imageRef);
    // console.log(downloadURL);
    return {
      image_name: convertToSlug(file.originalname),
      downloadURL,
    };
  }

  async uploadImages(files: Array<Express.Multer.File>) {
    let fileList = [];
    for (let i = 0; i < files.length; i++) {
      const file = await this.uploadImage(files[i]);
      fileList.push(file);
    }
    return fileList;
  }
}
