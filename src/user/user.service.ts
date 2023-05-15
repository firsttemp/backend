import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/user-create.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { UserUpdateDto } from "./dto/user-update.dto";
import { Cart } from "../cart/cart.entity";



@Injectable()
export class UserService {

  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  create(user: CreateUserDto): Promise<User> {
    const newUser = {...user, cart: new Cart()}
    return this.userRepository.save(newUser);
  }

  getByID(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id }});
  }

  getByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  getByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  updateById(id: number, dto: UserUpdateDto): Promise<any> {
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