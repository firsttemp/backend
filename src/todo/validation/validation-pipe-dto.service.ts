import { ArgumentMetadata, HttpException, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export class MyValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      const errorsMessages = {};
      errors.forEach((error) => {
        errorsMessages[error.property] = Object.values(error.constraints)[0]
      })

      throw new HttpException({
        message: 'validation failed',
        errors: {...errorsMessages}
      }, 400);
    }

    return value;
  }
}

