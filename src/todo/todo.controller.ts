import {
  Controller,
  Body, Post,
  Get, Put,
  Delete,
  Param,
  ParseIntPipe, Query
} from "@nestjs/common";
import { CreateTodoDto } from "src/todo/dto/todo-create.dto";
import { TodoService } from "./todo.service";
import { TodoUpdateDto } from "src/todo/dto/todo-update.dto";
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

  @Get('all')
  getAll() {
    return this.todoService.getAll();
  }

  @Get('paginate')
  paginate(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('offset', ParseIntPipe) offset: number
  ) {
    return this.todoService.paginate(limit, offset);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number})
  getOne(@Param("id", ParseIntPipe) id: number) {
    return this.todoService.getById(+id);
  }


  @Put(":id")
  @ApiParam({ name: 'id', type: Number})
  updateOne(@Param("id", ParseIntPipe) id: string, @Body() updateTodoDto: TodoUpdateDto) {
    return this.todoService.updateById(+id, updateTodoDto);
  }

  @Delete(":id")
  @ApiParam({ name: 'id', type: Number})
  deleteOne(@Param("id", ParseIntPipe) id: string) {
    return this.todoService.deleteById(+id);
  }
}
