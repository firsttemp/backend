import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TodoDto } from 'src/dto/todo.tdo';
import { todos } from './data/todos-list';

@Injectable()
export class TodoService {

    createNewTodo(createTodoDto: TodoDto): TodoDto {
        todos.push({...createTodoDto});
        return todos.find(todo => todo.id === +createTodoDto.id);
    }

    getAllTodos(): TodoDto[] {
        return todos;
    }

    getTodoById(id: number): TodoDto {
        return todos.find(todo => todo.id === id)
    }

    updateTodoById(id: number, updateTodoDto: TodoDto): TodoDto {
        const index = todos.findIndex(todo => todo.id === id);
        todos[index] = updateTodoDto;
        return todos[index];
    }

    deleteTodoById(id: number) {
        const index = todos.findIndex(todo => todo.id === id);;
        const todo = todos[index];
        todos.splice(index, 1);
        return todo;
    }
}