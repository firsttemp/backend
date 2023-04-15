import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/user-create.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { UpdateUserDto } from "./dto/user-update.dto";


@Injectable()
export class UserService {

  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  createUser(user: CreateUserDto): Promise<User> {
    return this.userRepository.save(user);
  }

  getUserByID(id: number): Promise<User> {
    return this.userRepository.findOne({where: {id}, relations: ['todos']})
  }

  getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({where: {email}})
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['todos'] });
  }

  updateById(id: number, todo: UpdateUserDto): Promise<any> {
    return this.userRepository.update(id, todo)
  }

  deleteById(id: number): Promise<any> {
    return this.userRepository.delete(id);
  }

  async getById(id: number) {
    const user = await this.userRepository.findOne({where: {id}});
    if (user) {
      return user;
    }
    throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
  }
}