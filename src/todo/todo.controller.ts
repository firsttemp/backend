import {
  Controller,
  Body, Post,
  Get, Put,
  Delete,
  Param,
  ParseIntPipe
} from "@nestjs/common";
import { CreateTodoDto } from "src/todo/dto/creare-todo.tdo";
import { TodoService } from "./todo.service";
import { UpdateTodoDto } from "src/todo/dto/update-todo.dto";
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from "@nestjs/swagger";

@ApiTags('todos')
@ApiBearerAuth()
@Controller("/todos")
export class TodoController {
  constructor(
    private readonly todoService: TodoService) {
  }

  @Post()
  @ApiBody({ type: CreateTodoDto })
  createOne(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.createNew(createTodoDto);
  }

  @Get()
  getAll() {
    return this.todoService.getAll();
  }

  @Get(":id")
  @ApiParam({ name: 'id', type: Number})
  getOne(@Param("id", ParseIntPipe) id: number) {
    return this.todoService.getById(+id);
  }

  @Put(":id")
  @ApiParam({ name: 'id', type: Number})
  updateOne(@Param("id", ParseIntPipe) id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.updateById(+id, updateTodoDto);
  }

  @Delete(":id")
  @ApiParam({ name: 'id', type: Number})
  deleteOne(@Param("id", ParseIntPipe) id: string) {
    return this.todoService.deleteById(+id);
  }
}
