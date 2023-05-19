import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import { UserService } from "../../user/user.service";
import { ConfigService } from "@nestjs/config";
import { User } from "../../user/user.entity";
import { IJwtPayload } from "../../shared/types/jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    private configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get('JWT_SECRET')
    });
  }

  async validate(payload: IJwtPayload): Promise<User> {
    const user = await this.userService.findOne(payload.sub)
    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      ...user,
      password: null
    }
  }
}