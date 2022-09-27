import { UserService } from "./user.service";
import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { AuthGuard } from "@nestjs/passport";
import { User } from "./user.entity";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthService } from "../../auth/auth.service";
import { LoginDto } from "./dto/login.dto";
import { LoginOtpDto } from "./dto/login-otp.dto";
import { RedisHelper } from "../../helpers/redis-helper";
import { EventHelper } from "../../helpers/events.helper";
import { SendSmsDto } from "./dto/send-sms.dto";
import { PasswordResetOtpDto } from "./dto/password-reset-otp.dto";
import { PasswordResetConfirmOptDto } from "./dto/password-reset-confirm-opt.dto";
import { Roles } from "./model/role.model";
import { AccountStateDto } from "./dto/account-state.dto";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const otpGenerator = require("otp-generator");

@ApiTags("user management")
@Controller({ version: "1", path: "/users" })
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly redisHelper: RedisHelper,
    private readonly eventHelper: EventHelper,
  ) {}

  private static toResponse(users: User[]) {
    return users.map((u) => {
      delete u.password;
      return u;
    });
  }

  @ApiBearerAuth()
  @Get()
  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(ClassSerializerInterceptor)
  async users(@Request() request) {
    const user: User = request.user;
    if (user.role != Roles.Admin)
      throw new ForbiddenException("Not allowed to access");

    const users = await this.userService.findAll();

    return UserController.toResponse(users);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Put("/update-state/:id")
  @UseInterceptors(ClassSerializerInterceptor)
  async updateState(
    @Body() stateDto: AccountStateDto,
    @Param("id") id: string,
    @Request() request,
  ) {
    const loggedInUser: User = request.user;
    if (loggedInUser.role != "admin")
      throw new ForbiddenException("Not allowed to access");
    const user = await User.findOne({ where: { id } });
    return this.userService.updateAccountState(user, stateDto.state);
  }

  @Post("/register")
  @UseInterceptors(ClassSerializerInterceptor)
  async register(@Body() registerDto: RegisterDto) {
    const foundUser = await this.userService.findUserByUsername(
      registerDto.username,
    );
    if (foundUser != null)
      throw new BadRequestException("Username have been already used");

    const foundUserPhone = await this.userService.findUserByPhone(
      registerDto.phoneNumber,
    );

    if (foundUserPhone != null)
      throw new BadRequestException("Phone number have been already used");

    const foundUserEmail = await this.userService.findUserByEmail(
      registerDto.email,
    );

    if (foundUserEmail != null)
      throw new BadRequestException("Email have been already used");

    const user = new User();
    user.firstName = registerDto.firstName;
    user.lastName = registerDto.lastName;
    user.username = registerDto.username;
    user.password = registerDto.password;
    user.nationality = registerDto.nationality;
    user.gender = registerDto.gender;
    user.maritalStatus = registerDto.maritalStatus;
    user.dateOfBirth = registerDto.dateOfBirth;
    user.profilePicture = registerDto.profilePicture;
    user.phoneNumber = registerDto.phoneNumber;
    user.email = registerDto.email;

    const { user: createdUser } = await this.authService.register(user);
    return createdUser;
  }

  @Post("/request-login-otp")
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );
    if (!user) throw new BadRequestException("Invalid login credentials");
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      digits: true,
      lowerCaseAlphabets: false,
    });
    console.log("Generated OTP: " + otp);
    this.redisHelper.set(`login-opt-${otp}`, user);
    const smsDto: SendSmsDto = {
      phoneNumber: user.phoneNumber,
      message: `Code: ${otp} use is to verify your login. Don't share it with anyone. It will expire in 10 minutes.`,
      senderID: process.env.SMS_SENDER_ID,
    };
    await this.eventHelper.sendEvent(
      "Send SMS",
      smsDto,
      process.env.SEND_SMS_REQUEST_TOPIC,
    );
    return {
      message:
        "We have sent you an OTP to your phone number that ends with " +
        user.phoneNumber.slice(-3),
    };
  }

  @Post("/confirm-login-otp")
  async confirmOTP(@Body() loginOtpDto: LoginOtpDto) {
    const user = await this.redisHelper.get(`login-opt-${loginOtpDto.otp}`);
    if (!user) throw new BadRequestException("Invalid OTP");
    return this.authService.login(user);
  }

  @Post("/password-reset")
  async passwordResetOtpRequest(@Body() passwordResetDto: PasswordResetOtpDto) {
    const user = await User.findOne({
      where: { username: passwordResetDto.username },
    });
    if (!user) throw new BadRequestException("Invalid username");
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      digits: true,
      lowerCaseAlphabets: false,
    });
    console.log("Generated OTP: " + otp);
    this.redisHelper.set(`password-reset-opt-${otp}`, user);
    const smsDto: SendSmsDto = {
      phoneNumber: user.phoneNumber,
      message: `Code: ${otp} use is it to reset your password. Don't share it with anyone. It will expire in 10 minutes.`,
      senderID: process.env.SMS_SENDER_ID,
    };
    await this.eventHelper.sendEvent(
      "Send SMS",
      smsDto,
      process.env.SEND_SMS_REQUEST_TOPIC,
    );
    return {
      message:
        "We have sent you an OTP to your phone number that ends with " +
        user.phoneNumber.slice(-3),
    };
  }

  @Post("/confirm-password-reset-otp")
  async passwordResetOptConfirm(
    @Body() passwordResetConfirmOptDto: PasswordResetConfirmOptDto,
  ) {
    const user: User = await this.redisHelper.get(
      `password-reset-opt-${passwordResetConfirmOptDto.otp}`,
    );
    if (!user) throw new BadRequestException("Invalid OTP");
    await this.userService.resetPassword(
      user.id,
      passwordResetConfirmOptDto.password,
    );
    return { message: "Password was reset successfully" };
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"))
  @Get("/check")
  @UseInterceptors(ClassSerializerInterceptor)
  checkLogin(@Request() req) {
    const user = req.user;
    return User.findOne({ where: { id: user.id }, relations: ["detail"] });
  }
}
