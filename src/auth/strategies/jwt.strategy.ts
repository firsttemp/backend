import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import { UserService } from "../../user/user.service";
import { ConfigService } from "@nestjs/config";
import { User } from "../../user/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    private configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET')
    });
  }

  async validate(payload: any): Promise<User> {
    const user = await this.userService.getByEmail(payload.email)
    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      ...user
    }
  }
}