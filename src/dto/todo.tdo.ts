import { IsNumber, IsString, IsBoolean, IsNotEmpty} from "class-validator";

export class TodoDto {


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