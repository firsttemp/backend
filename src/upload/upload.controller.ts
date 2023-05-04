import { Controller, Post, UploadedFile, UseInterceptors, Request } from "@nestjs/common";
import { UploadService } from "./upload.service";
import { FileInterceptor } from "@nestjs/platform-express";


@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  uploadAvatar(@UploadedFile() file: Express.Multer.File, @Request() req) {
    return this.uploadService.uploadAvatar(file, req.user);
  }

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File, @Request() req) {
    return this.uploadService.uploadImage(file, req.user);
  }

  @Post('video')
  @UseInterceptors(FileInterceptor('file'))
  uploadVideo(@UploadedFile() file: Express.Multer.File, @Request() req) {
    return this.uploadService.uploadVideo(file, req.user);
  }
}