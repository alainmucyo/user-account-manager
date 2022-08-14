import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { SmsDto } from "./dto/sms.dto";
import axios from "axios";

@Processor(process.env.QUEUE_NAME)
export class SmsProcessor {
  @Process()
  async sendSMS(job: Job) {
    console.log("Sending SMS");
    const smsData: SmsDto = job.data;
    const headers = {
      "Content-Type": "application/json",
      cmd: "SEND_SMS",
      domain: process.env.SMS_DOMAIN,
    };
    try {
      const response = await axios.post(
        process.env.SMS_URL,
        {
          src: smsData.senderID,
          dest: smsData.phoneNumber,
          message: smsData.message,
          wait: 0,
          contractId: process.env.SMS_CONTRACT_ID,
        },
        { headers },
      );
      console.log(response);
    } catch (e) {
      console.log(e);
      throw e; // Throw the error so that the job can be retried
    }
  }
}
