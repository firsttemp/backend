import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/user-create.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { UserUpdateDto } from "./dto/user-update.dto";
import { FileService } from "../file/file.service";


@Injectable()
export class UserService {

  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  constructor(private fileService: FileService) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find({
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true
      }
    });
  }


  findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id }});
  }

  async createOne(user: CreateUserDto): Promise<Partial<User>> {
    const { id, username, email } = await this.userRepository.save(user);
    return {id, username, email}
  }

  async updateOne(updateDto: UserUpdateDto, avatar, id): Promise<any> {
    const user: User = await this.userRepository.findOne({where: {id}});

    if (!user)
      throw new BadRequestException('User not found');

    if (updateDto.username) {
      const { username } = await this.getByUsername(updateDto.username) || {username: ''};

      if (updateDto.username === username)
        throw new BadRequestException('User with this username already exists!')
    }

    if (user.avatar) {
      await this.fileService.removeImages([user.avatar])
    }

    const [ newAvatar ]: string[] = await this.fileService.saveImages([avatar], 'user_avatars');
    user.avatar = newAvatar;

    Object.assign(user, updateDto);

    return this.userRepository.update(id, user);
  }

  async deleteOne(id: number): Promise<any> {
    const user: User = await this.userRepository.findOne({where: {id}});
    if (!user)
      throw new BadRequestException('User not found');

    const delResult = await this.userRepository.delete(id);
    if (user.avatar)
      await this.fileService.removeImages([user.avatar])

    return delResult;
  }

  getByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  getByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }

  paginate(limit: number, offset: number) {
    return this.userRepository.find({
      skip: offset,
      take: limit,
      relations: ["todos"]
    });
  }
}