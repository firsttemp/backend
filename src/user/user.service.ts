import { Injectable } from "@nestjs/common";
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
    return this.userRepository.findOne({ where: { id }, relations: ["todos"] });
  }

  getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  getUserByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ["todos"] });
  }

  updateById(id: number, dto: UpdateUserDto): Promise<any> {
    return this.userRepository.update(id, dto);
  }

  paginate(limit: number, offset: number) {
    return this.userRepository.find({
      skip: offset,
      take: limit,
      relations: ["todos"]
    });
  }


  deleteById(id: number): Promise<any> {
    return this.userRepository.delete(id);
  }

}