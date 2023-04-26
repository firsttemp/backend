import { Module } from "@nestjs/common";
import { TodoModule } from "./todo/todo.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule} from "@nestjs/config";
import { PostgresDbModule } from "./shared/postgres/postgres-db.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TodoModule,
    UserModule,
    AuthModule,
    PostgresDbModule
  ]
})
export class AppModule {}
