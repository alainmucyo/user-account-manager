import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class PasswordResetOtpDto {
  @IsNotEmpty()
  @ApiProperty()
  username: string;
}
