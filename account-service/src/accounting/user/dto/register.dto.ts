import {
  IsBase64,
  IsDate,
  IsDateString,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Gender } from "../model/gender.model";
import { MaritalStatus } from "../model/marital-status.model";

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "User's phone number.",
    example: "250785253349",
  })
  @Matches(/(2507[8,2,3,9])[0-9]{7}/, {
    message:
      "Phone number must be Airtel or MTN number formatted like 250*********",
  })
  phoneNumber: string;

  @IsDateString()
  @ApiProperty()
  dateOfBirth: Date;

  @IsOptional()
  @ApiProperty({ description: "base64 encoded image" })
  profilePicture: string;

  @IsNotEmpty()
  @ApiProperty({ enum: Gender })
  @IsIn(["male", "female"])
  gender: Gender;

  @IsNotEmpty()
  @ApiProperty({ enum: MaritalStatus })
  @IsIn(["married", "single", "divorced", "widowed"])
  maritalStatus: MaritalStatus;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  nationality: string;

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
}
