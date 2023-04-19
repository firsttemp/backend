import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/user-create.dto";
import { UpdateUserDto } from "./dto/user-update.dto";
import { User } from "./user.entity";

@Controller("/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createOne(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get("/all")
  getAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  getOne(@Param("id", ParseIntPipe) id: number): Promise<User> {
    return this.userService.getUserByID(id);
  }

  @Put(":id")
  updateOne(@Param("id", ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateById(id, updateUserDto);
  }

  @Delete(":id")
  deleteOne(@Param("id", ParseIntPipe) id: string) {
    return this.userService.deleteById(+id);

  }
}