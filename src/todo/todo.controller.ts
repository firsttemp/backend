import {
    Controller,
    Body, Post,
    Get, Put, Delete,
    Param, UsePipes,
    ParseIntPipe
} from "@nestjs/common";
import { CreateTodoDto } from 'src/todo/dto/creare-todo.tdo';
import { TodoService } from './todo.service';
import { UpdateTodoDto } from 'src/todo/dto/update-todo.dto';
import { MyValidationPipe } from "./validation/validation-pipe-dto.service";

@Controller('/todos')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Post()
    @UsePipes(MyValidationPipe)
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
    updateOne(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
        return this.todoService.updateById(+id, updateTodoDto)
    }

    @Delete(':id')
    deleteOne(@Param('id') id: string) {
        return this.todoService.deleteById(+id);

    }
}
