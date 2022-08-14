import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { SmsDto } from "./dto/sms.dto";
import { SmsService } from "./sms.service";
require("dotenv").config();

@Controller()
export class SmsController {
  constructor(private readonly smsService: SmsService) {}
  @MessagePattern(process.env.SEND_SMS_REQUEST_TOPIC)
  handleSMSRequest(@Payload() payload: any) {
    const value: SmsDto=payload.value;
    console.log("Received SMS request: ", payload);
    this.smsService.sendSMS(payload.value);
  }
}
