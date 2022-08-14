import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LoginOtpDto {
  @IsNotEmpty()
  @ApiProperty()
  otp: string;
}
