import { Injectable } from "@nestjs/common";
import { CreateTodoDto } from "src/api/todo/dto/creare-todo.tdo";
import { UpdateTodoDto } from "src/api/todo/dto/update-todo.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Todo } from "./todo.entity";
import { User } from "../user/user.entity";

@Injectable()
export class TodoService {

  @InjectRepository(Todo)
  private readonly todoRepository: Repository<Todo>;

  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  async createNew(todo: CreateTodoDto) {
    return this.todoRepository.save(todo)
  }

  getAll(): Promise<Todo[]> {
    return this.todoRepository.find({loadRelationIds: true});
  }

  async getById(id: number): Promise<Todo> {
    return this.todoRepository.findOne({where: {id}, loadRelationIds: true})
  };

  async updateById(id: number, todo: UpdateTodoDto): Promise<any> {
    return this.todoRepository.update(id, todo);
  }

  deleteById(id: number): Promise<any> {
    return this.todoRepository.delete(id);
  }
}