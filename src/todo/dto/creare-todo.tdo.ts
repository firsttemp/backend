import { IsNumber, IsString, IsBoolean, IsNotEmpty} from "class-validator";
import { User } from "../../user/user.entity";


export class CreateTodoDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsBoolean()
    @IsNotEmpty()
    completed: boolean;

    @IsNotEmpty()
    @IsNumber()
    user: User;
}