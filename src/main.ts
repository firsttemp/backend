import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validationPipe } from "./validation/validation.pipe";
import * as cookieParser from 'cookie-parser';

async function myapp() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(validationPipe);
  app.setGlobalPrefix('/api');
  app.use(cookieParser());
  await app.listen(3000);
}
myapp().then(() => console.log('App started!'));
