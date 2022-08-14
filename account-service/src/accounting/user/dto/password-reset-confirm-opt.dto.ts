import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class PasswordResetConfirmOptDto {
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  otp: string;
}
