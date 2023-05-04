import { HttpException, Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";
import * as uuid from "uuid";
import { UserService } from "../user/user.service";
import { IReqUser } from "../shared/types/req-user.interface";


@Injectable()
export class UploadService {

  constructor(
    private userService: UserService) {}

  async uploadAvatar(file: Express.Multer.File, user: IReqUser) {
    const avatar = this.uploadFile(file, "avatars");
    await this.userService.updateById(user.id, { avatar: avatar.url });
    return avatar;
  }

  async uploadImage(file: Express.Multer.File, user: IReqUser) {
    const image = this.uploadFile(file, "images");
    const existingUser = await this.userService.getUserByID(user.id);
    const newImages = existingUser.images ? [...existingUser.images, image.url] : [image.url];
    await this.userService.updateById(user.id, { images: newImages });
    return image;
  }

  async uploadVideo(file: Express.Multer.File, user: IReqUser) {
    const video = this.uploadFile(file, "videos");
    const existingUser = await this.userService.getUserByID(user.id);
    const newVideos = existingUser.videos ? [...existingUser.videos, video.url] : [video.url];
    await this.userService.updateById(user.id, { videos: newVideos });
    return video;
  }

  private uploadFile(file: Express.Multer.File, dir: string) {
    try {
      const fileExtName = file.originalname.split(".").pop();
      const fileName = `${uuid.v4()}.${fileExtName}`;
      const filePath = path.resolve(__dirname, "..", "public", dir);
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
      return {
        url: `http://localhost:3000/${dir}/${fileName}`
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}