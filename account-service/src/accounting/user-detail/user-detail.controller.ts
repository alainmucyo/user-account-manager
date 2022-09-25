import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { UserDetailsDto } from "./dto/user-details.dto";
import { UserDetailService } from "./user-detail.service";
import { User } from "../user/user.entity";

@ApiTags("user details")
@Controller({ version: "1", path: "user-detail" })
export class UserDetailController {
  constructor(private readonly userDetailService: UserDetailService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Post("/user-details")
  @UseInterceptors(ClassSerializerInterceptor)
  save(@Body() userDetailDto: UserDetailsDto, @Request() req) {
    const user: User = req.user;

    return this.userDetailService.save(userDetailDto, user);
  }
}
