import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthLoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  password: string;
}