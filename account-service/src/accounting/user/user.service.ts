import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import { USER_ENTITY } from "../../constants/entities";
import { AccountStateModel } from "./model/account-state.model";
import { SendSmsDto } from "./dto/send-sms.dto";
import { EventHelper } from "../../helpers/events.helper";
import {Roles} from "./model/role.model";

@Injectable()
export class UserService {
  constructor(
    @InjectQueue(process.env.QUEUE_NAME) private readonly queue: Queue,
    private readonly eventHelper: EventHelper,
  ) {}
  async findAll() {
    return await User.find({
      relations: ["detail"],
      where: { role: Roles.User },
      order: { created_at: "DESC" },
    });
  }

  async updateAccountState(user: User, accountState: AccountStateModel) {
    user.state = accountState;
    await user.save();

    const smsDto: SendSmsDto = {
      phoneNumber: user.phoneNumber,
      message: `${user.firstName}, your account is ${accountState}. Thank you for using our services, contact us if you have any issues.`,
      senderID: process.env.SMS_SENDER_ID,
    };
    await this.eventHelper.sendEvent(
      "Send SMS",
      smsDto,
      process.env.SEND_SMS_REQUEST_TOPIC,
    );
    return user;
  }

  async storeUser(user: User) {
    const profilePicture = user.profilePicture;
    user.profilePicture = null;
    const savedUser = await user.save();
    if (profilePicture) {
      await this.queue.add(
        {
          entity: USER_ENTITY,
          image: profilePicture,
          columnName: "profilePicture",
          id: savedUser.id,
        },
        {
          attempts: Number(process.env.QUEUE_RETRIES),
        },
      );
    }
    return savedUser;
  }

  async findUserByUsername(username: string) {
    return User.findOne({ where: { username } });
  }
  async findUserByEmail(email: string) {
    return User.findOne({ where: { email } });
  }
  async findUserByPhone(phoneNumber: string) {
    return User.findOne({ where: { phoneNumber } });
  }
  findById(id: string) {
    return User.findOne({ where: { id } });
  }

  async resetPassword(userId: string, password: string) {
    const salt = await bcrypt.genSalt();
    const newPassword = await bcrypt.hash(password, salt);
    return User.update({ id: userId }, { password: newPassword });
  }
}
