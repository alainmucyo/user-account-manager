import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import { UserDetailsDto } from "./dto/user-details.dto";
import { User } from "../user/user.entity";
import { UserDetail } from "./user-detail.entity";
import { USER_DETAIL_ENTITY } from "../../constants/entities";
import { AccountStateModel } from "../user/model/account-state.model";

@Injectable()
export class UserDetailService {
  constructor(
    @InjectQueue(process.env.QUEUE_NAME) private readonly queue: Queue,
  ) {}

  async save(userDetailDto: UserDetailsDto, user: User) {
    if (
      user.state == AccountStateModel.Verified ||
      user.state == AccountStateModel.PendingVerification
    ) {
      throw new BadRequestException(
        "Account already verified or pending for verification",
      );
    }
    let userDetail = new UserDetail();
    const existingUserDetail = await UserDetail.findOne({
      where: { user: { id: user.id } },
    });
    if (existingUserDetail) {
      userDetail = existingUserDetail;
    }

    userDetail.user = user;
    userDetail.nid_passport = userDetailDto.nid_passport;
    const createdDetails = await userDetail.save();
    console.log("Add to queue");
    await this.queue.add(
      {
        entity: USER_DETAIL_ENTITY,
        image: userDetailDto.document_image,
        columnName: "document_image",
        id: createdDetails.id,
      },
      {
        attempts: Number(process.env.QUEUE_RETRIES),
      },
    );
    user.state = AccountStateModel.PendingVerification;
    await user.save();
  }
}
