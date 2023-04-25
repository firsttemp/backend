import { Module } from "@nestjs/common";
import { TodoModule } from "./todo/todo.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule} from "@nestjs/config";
import { TypeormConfigService } from "./shared/typeorm-config.service";
import { DataSource } from "typeorm";

@Module({
  imports: [
    TodoModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: TypeormConfigService,
      dataSourceFactory: async (options) => {
        return await new DataSource(options).initialize(); }}),
  ]
})
export class AppModule {
}
