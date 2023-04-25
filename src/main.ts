import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validationPipe } from "./validation/validation.pipe";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function myapp() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(validationPipe);
  app.setGlobalPrefix('/api');

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('API example')
    .setDescription('The API description')
    .setVersion('1.0')
    .build()


  const options =  {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
myapp().then(() => console.log('App started!'));
