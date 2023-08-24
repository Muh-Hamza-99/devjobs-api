import { IsNotEmpty, IsString, IsUrl, MaxLength, MinLength } from "class-validator";
import { HasMimeType, IsFile, MemoryStoredFile } from "nestjs-form-data";
import { PartialType } from "@nestjs/mapped-types";

export class CompanyDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(100)
    description: string;

    @IsString()
    @IsNotEmpty()
    industry: string;

    @IsString()
    @IsNotEmpty()
    location: string;

    @IsString()
    @IsNotEmpty()
    @IsUrl()
    website: string;
}

export class UpdateCompanyDto extends PartialType(CompanyDto) {}

export class UploadLogoDto {
    @IsFile()
    @HasMimeType(["image/png", "image/jpeg", "image/jpg"])
    logo: MemoryStoredFile
}