import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { BullModule } from "@nestjs/bull";
import { SmsService } from "./sms/sms.service";
import { SmsProcessor } from "./sms/sms.processor";
import { SmsController } from "./sms/sms.controller";

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
      },
    }),
    BullModule.registerQueue({
      name: process.env.QUEUE_NAME,
    }),
  ],
  controllers: [AppController, SmsController],
  providers: [AppService, SmsService, SmsProcessor],
})
export class AppModule {}
