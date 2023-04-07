import { IsNumber, IsString, IsBoolean, IsNotEmpty} from "class-validator";

export class CreateTodoDto {


    @IsNumber({})
    @IsNotEmpty()
    id: number;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsBoolean()
    @IsNotEmpty()
    completed: boolean;
}