import { PartialType } from '@nestjs/mapped-types'
import { CreateTodoDto } from "./creare-todo.tdo";

export class UpdateTodoDto extends PartialType(CreateTodoDto) {

}