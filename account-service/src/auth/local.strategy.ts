import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Injectable()
export class LocaleStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(otp) {
    console.log("Loggin in");
    const user = await this.authService.validateOtp(otp);
    if (user == null) throw new UnauthorizedException("Invalid OTP value");
    return user;
  }
}
