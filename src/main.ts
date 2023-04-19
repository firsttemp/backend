import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validationPipe } from "./validation/validation.pipe";

async function myapp() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(validationPipe);
  app.setGlobalPrefix('/api');
  await app.listen(3000);
}
myapp().then(() => console.log('App started!'));
