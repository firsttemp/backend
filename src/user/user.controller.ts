import {
  ClassSerializerInterceptor,
  UseInterceptors, Query,
  ParseIntPipe,
  Controller,
  Delete,
  Body,
  Get,
  Param,
  Put,

} from "@nestjs/common";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/user-update.dto";
import { User } from "./user.entity";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { Roles } from "../auth/roles/roles.decorator";
import { Role } from "../auth/roles/roles.enum";

@ApiTags('users')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@Controller("/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("all")
  getAll() {
    return this.userService.findAll();
  }

  @Get('paginate')
  paginate(
    @Query('limit') limit: number,
    @Query('offset') offset: number) {
    return this.userService.paginate(limit, offset);
  }

  @Get(":id")
  @ApiParam({ name: 'id', type: Number})
  getOne(@Param("id", ParseIntPipe) id: number): Promise<User> {
    return this.userService.getUserByID(id);
  }


  @Put(":id")
  @ApiParam({ name: 'id', type: Number})
  updateOne(@Param("id", ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateById(id, updateUserDto);
  }


  @Delete(":id")
  @Roles(Role.Admin)
  @ApiParam({ name: 'id', type: Number})
  deleteOne(@Param("id", ParseIntPipe) id: string) {
    return this.userService.deleteById(+id);

  }


}