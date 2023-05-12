import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ProductCreateDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  images: any[];

  @IsArray()
  categoryIDs: number[]
}
