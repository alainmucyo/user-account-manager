import { Injectable } from "@nestjs/common";
import { SmsDto } from "./dto/sms.dto";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

@Injectable()
export class SmsService {
  constructor(
    @InjectQueue(process.env.QUEUE_NAME) private readonly queue: Queue,
  ) {}
  async sendSMS(payload: SmsDto) {
    console.log("SMS Request: ", payload);
    await this.queue.add(payload, {
      attempts: Number(process.env.QUEUE_RETRIES), // Number of retries if the job fails
    });
  }
}
