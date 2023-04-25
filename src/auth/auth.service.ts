import { BadRequestException, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { CreateUserDto } from "../user/dto/user-create.dto";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";



@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async signUp(dto: CreateUserDto) {
    if (await this.userService.getUserByUsername(dto.username)) throw new BadRequestException('Username already exists');
    if (await this.userService.getUserByEmail(dto.email)) throw new BadRequestException('Email already exists');

    const hashPassword = await this.hashData(dto.password);
    const user = await this.userService.createUser({...dto, password: hashPassword});
    const { password, ...result } = user;
    return result;
  }

  async login(user: any): Promise<any> {
    const payload = { email: user.email, sub: user.id, username: user.username};
    return {
      access_token: this.jwtService.sign(payload),
    }
  }


  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  private async hashData(data): Promise<string> {
    return await bcrypt.hash(data, 10);
  }

}