import { IsBase64, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserDetailsDto {
  @IsNotEmpty()
  @ApiProperty({ description: "National ID or Passport Number" })
  nid_passport: string;

  @ApiProperty({ description: "Image base64 string" })
  @IsNotEmpty()
  document_image: string;
}
