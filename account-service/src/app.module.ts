import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseConnectionService } from "./config/db";
import { UserService } from "./accounting/user/user.service";
import { AuthService } from "./auth/auth.service";
import { LocaleStrategy } from "./auth/local.strategy";
import { JwtStrategy } from "./auth/jwt.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { UserController } from "./accounting/user/user.controller";
import { KafkaHelper } from "./helpers/kafka.helper";
import { EventHelper } from "./helpers/events.helper";
import { RedisHelper } from "./helpers/redis-helper";
import { CloudinaryModule } from "./cloudinary/cloudinary.module";
import { BullModule } from "@nestjs/bull";
import { UserDetailService } from "./accounting/user-detail/user-detail.service";
import { UserDetailController } from "./accounting/user-detail/user-detail.controller";
import { ImageUploadProcessor } from "./processors/image-upload.processor";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService,
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
      },
    }),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "60000s" },
    }),

    BullModule.registerQueue({
      name: process.env.QUEUE_NAME,
    }),
    CloudinaryModule,
  ],
  controllers: [AppController, UserController, UserDetailController],
  providers: [
    AppService,
    UserService,
    AuthService,
    LocaleStrategy,
    JwtStrategy,
    KafkaHelper,
    EventHelper,
    RedisHelper,
    UserDetailService,
    ImageUploadProcessor,
  ],
})
export class AppModule {}
