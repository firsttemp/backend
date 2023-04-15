import { Module } from '@nestjs/common';
import { TodoModule } from './api/todo/todo.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./api/user/user.module";
import { AuthModule } from "./api/auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    TodoModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      })
      }),
    TypeOrmModule.forRoot(
      {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        database: 'nest_todo_api',
        username: 'postgres',
        password: 'toor',
        entities: ['dist/**/*.entity.{ts,js}'],
        migrations: ['dist/migrations/*.{ts,js}'],
        migrationsTableName: 'typeorm_migrations',
        logger: 'file',
        synchronize: true,
      }),

  ],
})
export class AppModule {}
