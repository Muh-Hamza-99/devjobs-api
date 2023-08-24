import { OmitType } from "@nestjs/mapped-types";
import {  IsEmail, IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class UserRegisterDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    password: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
}

export class UserLoginDto extends OmitType(UserRegisterDto, ["username"] as const) {}

export class CompanyRegisterDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(30)
    company: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    password: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
}

export class CompanyLoginDto extends OmitType(CompanyRegisterDto, ["company"] as const) {}

export class VerifyEmailDto {
    @IsNumber({ maxDecimalPlaces: 0 })
    @IsNotEmpty()
    @Min(99999999)
    @Max(1000000000)
    token: number;
}