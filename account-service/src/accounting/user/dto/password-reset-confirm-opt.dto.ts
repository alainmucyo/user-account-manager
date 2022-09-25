import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class PasswordResetConfirmOptDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      "Password needs to contain a capital letter, a number and a special character",
  })
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  otp: string;
}
