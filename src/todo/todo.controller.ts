import { Controller, Body, Post, Get, Put, Delete, Param } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from 'src/dto/creare-todo.tdo';
import { UpdateTodoDto } from 'src/dto/update-todo.dto';

@Controller('/todos')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Post()
    createOne(@Body() createTodoDto: CreateTodoDto) {
        return this.todoService.createNew(createTodoDto);
    }

    @Get()
    getAll() {
        return this.todoService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
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
