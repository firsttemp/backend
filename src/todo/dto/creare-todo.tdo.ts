import { IsNumber, IsString, IsBoolean, IsNotEmpty} from "class-validator";
import { User } from "../../user/user.entity";
import { ApiProperty } from "@nestjs/swagger";


export class CreateTodoDto {

    @ApiProperty({ example: 'This is a title'})
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 'false'})
    @IsBoolean()
    @IsNotEmpty()
    completed: boolean;

    @ApiProperty({ example: 1})
    @IsNotEmpty()
    @IsNumber()
    user: User;
}