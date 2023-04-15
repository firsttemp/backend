import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../user/dto/user-create.dto";
import { LocalAuthenticationGuard } from "./guards/local-auth.guard";
import { RequestWithUser } from './interfaces/erquest-with-user.interface'
import JwtAuthenticationGuard from "./guards/jwt-auth.guard";


@Controller('/auth')
export class AuthController {
  constructor(private readonly authServ: AuthService) {}
  @HttpCode(200)
  @Post('/register')
  async register(@Body() regData: CreateUserDto) {
    return this.authServ.register(regData)
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('/logout')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authServ.getCookieForLogOut());
    return response.sendStatus(200);
  }
  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('/login')
  login(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;
    const cookie = this.authServ.getCookiesWithJwtToken(user.id);

    response.setHeader('Set-Cookie', cookie)
    user.password = undefined;
    return response.send(user);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }

}