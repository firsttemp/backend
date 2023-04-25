import {
  ClassSerializerInterceptor,
  ParseIntPipe,
  Controller,
  Delete,
  Body,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/user-create.dto";
import { UpdateUserDto } from "./dto/user-update.dto";
import { User } from "./user.entity";
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from "@nestjs/swagger";

@ApiTags('user')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@Controller("/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  createOne(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get("/all")
  getAll() {
    return this.userService.findAll();
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
  @ApiParam({ name: 'id', type: Number})
  deleteOne(@Param("id", ParseIntPipe) id: string) {
    return this.userService.deleteById(+id);

  }
}