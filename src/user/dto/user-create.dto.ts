import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: 'admin'})
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'Admin'})
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({ example: 'User'})
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({ example: 'admin@gmail.com'})
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'admin'})
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  avatar: string;

  @IsString( {each: true,})
  images: string[];

  @IsString( {each: true})
  videos: string[];
}