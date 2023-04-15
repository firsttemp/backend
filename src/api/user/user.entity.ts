import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from "typeorm";
import { Todo } from "../todo/todo.entity";
import { Exclude } from "class-transformer";

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

  @Column({ type: "boolean", default: false })
  isDeleted: boolean;

  @CreateDateColumn({ type: "timestamp" })
  public createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  public updatedAt!: Date;
}