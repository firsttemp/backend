import {
  UseInterceptors,
  ParseIntPipe,
  Controller,
  Delete,
  Body,
  Get,
  Param,
  Put, UploadedFile, ParseFilePipe

} from "@nestjs/common";
import { UserService } from "./user.service";
import { UserUpdateDto } from "./dto/user-update.dto";
import { User } from "./user.entity";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { Roles } from "../shared/decorators/roles.decorator";
import { RoleEnum } from "../shared/types/roles.enum";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags('users')
@ApiBearerAuth()
@Roles(RoleEnum.Admin)
@Controller("/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("all")
  getAll() {
    return this.userService.findAll();
  }


  @Get(":id")
  @ApiParam({ name: 'id', type: Number})
  getOne(@Param("id", ParseIntPipe) id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @ApiParam({ name: 'id', type: Number})
  @UseInterceptors(FileInterceptor('avatar'))
  @Put(":id")
  updateOne(
    @UploadedFile(ParseFilePipe) avatar: Express.Multer.File,
    @Body() updateUserDto: UserUpdateDto,
    @Param("id") id: number,
  ) {
    return this.userService.updateOne(updateUserDto, avatar, id);
  }


  @ApiParam({ name: 'id', type: Number})
  @Delete(":id")
  deleteOne(@Param("id", ParseIntPipe) id: string) {
    return this.userService.deleteOne(+id);

  }

}