import { Controller, Body, Post, Get, Put, Delete, Param, HttpException, HttpStatus } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDto } from 'src/dto/todo.tdo';

@Controller('/todos')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Post()
    createOne(@Body() createTodoDto: TodoDto) {
        return this.todoService.createNewTodo(createTodoDto);
    }

    @Get()
    getAll() {
        return this.todoService.getAllTodos();
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.todoService.getTodoById(+id);
    }

    @Put(':id')
    updateOne(@Param('id') id: string, @Body() updateTodoDto: TodoDto) {
        return this.todoService.updateTodoById(+id, updateTodoDto)
    }

    @Delete(':id')
    deleteOne(@Param('id') id: string) {
        return this.todoService.deleteTodoById(+id);
        
    }
}
