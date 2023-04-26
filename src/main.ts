import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validationPipe } from "./validation/validation.pipe";
import { SwaggerModule } from "@nestjs/swagger";
import { config, options } from "./shared/swager/swager.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(validationPipe);
  app.setGlobalPrefix('/api');

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap().then(() => console.log('App started!'));
