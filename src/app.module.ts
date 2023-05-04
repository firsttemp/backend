import { Module } from "@nestjs/common";
import { TodoModule } from "./todo/todo.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule} from "@nestjs/config";
import { PostgresDbModule } from "./shared/postgres/postgres-db.module";
import { UploadModule } from "./upload/upload.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TodoModule,
    UserModule,
    AuthModule,
    UploadModule,
    PostgresDbModule,
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'public'),
    }),
  ]
})
export class AppModule {}
