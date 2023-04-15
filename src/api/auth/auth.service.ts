import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { CreateUserDto } from "../user/dto/user-create.dto";
import { User } from "../user/user.entity";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { TokenPayload } from "./interfaces/token-payload.interface";



@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async register(regData: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(regData.password, 10);
    try {
      const createdUser: User = await this.userService.createUser({
        ...regData,
        password: hashedPassword
      });
      createdUser.password = 'hidden';
      return createdUser;
    } catch (e) {
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAuthenticatedUser(email: string, hashedPassword: string) {
    try {
      const user = await this.userService.getUserByEmail(email);
      await this.verifyPassword(hashedPassword, user.password);
      user.password = 'hidden';
      return user;
    } catch (e) {
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public getCookiesWithJwtToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
  }

  private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(plainTextPassword, hashedPassword);
    if (!isPasswordMatching) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}