import { HasMimeType, IsFile, MemoryStoredFile } from "nestjs-form-data";
import { IsNotEmpty, IsString, IsUrl, Matches } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";

class UserDto {
    @IsString()
    @IsNotEmpty()
    @Matches(/^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+$/)
    github: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub)\/[a-zA-Z0-9-]+\/?$/)
    linkedin: string;

    @IsString()
    @IsNotEmpty()
    @IsUrl()
    website: string;
}

export class UpdateUserDto extends PartialType(UserDto) {}

export class UploadResumeDto {
    @IsFile()
    @HasMimeType(["application/pdf"])
    resume: MemoryStoredFile
}