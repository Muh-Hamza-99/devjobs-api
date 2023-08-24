import { Body, Controller, Param, Patch, Post } from "@nestjs/common";

import { UserRegisterDto, UserLoginDto, CompanyRegisterDto, VerifyEmailDto, CompanyLoginDto } from "./auth.dtos";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("register")
    async userRegister(@Body() body: UserRegisterDto) {
        return this.authService.userRegister(body);
    }

    @Post("login")
    userLogin(@Body() body: UserLoginDto) {
        return this.authService.userLogin(body);
    }

    @Post("company/register")
    companyRegister(@Body() body: CompanyRegisterDto) {
        return this.authService.companyRegister(body);
    }

    @Post("company/:id/sendemail")
    companyVerifySendEmail(@Param("id") id: string) {
        return this.authService.companySendEmail(id);
    }

    @Patch("company/:id/verify")
    companyVerify(@Body() body: VerifyEmailDto, @Param("id") id: string) {
        return this.authService.companyVerify(body, id);
    }

    @Post("company/login")
    companyLogin(@Body() body: CompanyLoginDto) {
        return this.authService.companyLogin(body);
    }
}