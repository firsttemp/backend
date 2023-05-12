import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import * as path from "path";
import * as fs from "fs";

@Injectable()
export class FileService {

  async saveImages(images: Express.Multer.File[]): Promise<string[]> {
    const urls: string[] = [];
    const uploadsDir = path.join(__dirname, '..', 'public', 'uploads', 'product-images');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, {recursive: true})
    }

    images.map(image => {
      const imageName = `${uuidv4()}${path.extname(image.originalname)}`;
      const imagePath = path.join(uploadsDir, imageName);
      try {
        fs.writeFileSync(imagePath, image.buffer);
        urls.push(`uploads/product-images/${imageName}`)
      } catch (err) {
        throw new HttpException('Error saving file to disk', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    })

    return urls;
  }
}