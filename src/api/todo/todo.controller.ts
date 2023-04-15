import {
    Controller,
    Body, Post,
    Get, Put, Delete,
    Param,
    ParseIntPipe
} from "@nestjs/common";
import { CreateTodoDto } from 'src/api/todo/dto/creare-todo.tdo';
import { TodoService } from './todo.service';
import { UpdateTodoDto } from 'src/api/todo/dto/update-todo.dto';

@Controller('/todos')
export class TodoController {
    constructor(
      private readonly todoService: TodoService) {}

    @Post()
    createOne(@Body() createTodoDto: CreateTodoDto) {

        return this.todoService.createNew(createTodoDto);
    }

    @Get()
    getAll() {
        return this.todoService.getAll();
    }

    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number) {
        return this.todoService.getById(+id);
    }

    @Put(':id')
    updateOne(@Param('id', ParseIntPipe) id: string, @Body() updateTodoDto: UpdateTodoDto) {
        return this.todoService.updateById(+id, updateTodoDto)
    }

    @Delete(':id')
    deleteOne(@Param('id', ParseIntPipe) id: string) {
        return this.todoService.deleteById(+id);

    }
}
