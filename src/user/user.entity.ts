import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Column,
  Entity,
} from "typeorm";
import { Todo } from "../todo/todo.entity";
import { Exclude } from "class-transformer";
import { Role } from "../auth/roles/roles.enum";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 20, unique: true })
  username!: string;

  @Column({ type: "varchar", length: 120, unique: true })
  email!: string;

  @Exclude()
  @Column({ type: "varchar", length: 200 })
  password!: string;

  @Column({type: "varchar", length: 30})
  firstname: string;

  @Column({type: "varchar", length: 30})
  lastname: string;

  @OneToMany(() => Todo, todo => todo.user)
  todos: Todo[];

  @Column({
    type: "enum",
    enum: Role,
    array: true,
    default: [Role.User]
  })
  roles: Role[];

  @CreateDateColumn({ type: "date" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "date" })
  updatedAt!: Date;

}
