import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from 'src/dto/creare-todo.tdo';
import { todos } from './data/todos-list';
import { UpdateTodoDto } from 'src/dto/update-todo.dto';

@Injectable()
export class TodoService {

    createNew(createTodoDto: CreateTodoDto): CreateTodoDto {
        todos.push({...createTodoDto});
        return todos.find(todo => todo.id === +createTodoDto.id);
    }

    getAll(): CreateTodoDto[] {
        return todos;
    }

    getById(id: number): CreateTodoDto {
        return todos.find(todo => todo.id === id)
    }

    updateById(id: number, updateTodoDto: UpdateTodoDto): UpdateTodoDto {
        const index = todos.findIndex(todo => todo.id === id);
        todos[index] = {...todos[index], ...updateTodoDto};
        return todos[index];
    }

    deleteById(id: number) {
        const index = todos.findIndex(todo => todo.id === id);;
        const todo = todos[index];
        todos.splice(index, 1);
        return todo;
        
    }
}