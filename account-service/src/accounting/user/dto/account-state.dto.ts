import { AccountStateModel } from "../model/account-state.model";
import { IsIn, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AccountStateDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsIn(Object.values(AccountStateModel))
  state: AccountStateModel;
}
