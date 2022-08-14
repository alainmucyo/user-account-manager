import { Injectable } from "@nestjs/common";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const asyncRedis = require("async-redis");
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

@Injectable()
export class RedisHelper {
  private readonly client;
  private readonly appName = process.env.APPLICATION_NAME;
  constructor() {
    const redisClient = `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;
    this.client = asyncRedis.createClient(redisClient);
    this.client.on("error", function (error) {
      console.error(error);
    });

    this.client.on("connect", function () {
      console.log("Connected to redis successfully");
    });
  }

  async set(key: string, value: any, ttl?: number) {
    // The key should only last for 10 minutes
    await this.client.set(
      `${this.appName}-${key}`,
      JSON.stringify(value),
      "EX",
      ttl || 600, // 10 minutes
    );
  }

  async get(key: string) {
    return JSON.parse(await this.client.get(`${this.appName}-${key}`));
  }

  async del(key: string) {
    return await this.client.del(`${this.appName}-${key}`);
  }
  async unlink(key: string) {
    return this.client.unlink(`${this.appName}-${key}`);
  }
}
