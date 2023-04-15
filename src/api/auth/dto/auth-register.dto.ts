import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthRegisterDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEmail()
  @IsNotEmpty()
  firstname: string;

  @IsEmail()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}