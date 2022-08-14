import { Injectable } from "@nestjs/common";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Kafka } = require("kafkajs");
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

@Injectable()
export class KafkaHelper {
  private producer;
  public consumer;
  constructor() {
    const kafka = new Kafka({
      brokers: [process.env.KAFKA_BROKER_URL],
    });

    // Assign the configs to the producer
    this.producer = kafka.producer();
    this.producer.connect().then(() => {
      // Connected
    });

    const consumer = kafka.consumer({
      groupId: process.env.KAFKA_GROUP_ID,
    });

    consumer.connect().then(() => {
      this.consumer = consumer;
    });
  }
  async send(data: any, transactionName: string, topic: string) {
    // Start APM transaction

    const messageToBeSent = JSON.stringify(data);

    try {
      // Send the event data to kafka
      await this.producer.send({
        topic: topic,
        messages: [
          {
            value: messageToBeSent,
            headers: { appName: process.env.APPLICATION_NAME },
          },
        ],
      });

      return { isMessageSent: true };
    } catch (error) {
      console.log("Error while sending Kafka request");
    }
  }
}
