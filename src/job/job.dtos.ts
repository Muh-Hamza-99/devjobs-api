import { IsBoolean, IsISO4217CurrencyCode, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";
import { OmitType, PartialType } from "@nestjs/mapped-types";
import { ExperienceLevel, Location } from "@prisma/client";

export class CreateJobDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(50)
    title: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(20)
    @MaxLength(200)
    description: string;

    @IsString()
    @IsNotEmpty()
    location: Location;

    @IsString()
    @IsNotEmpty()
    experienceLevel: ExperienceLevel;

    @IsNumber()
    @IsNotEmpty()
    monthlySalary: number;

    @IsISO4217CurrencyCode()
    @IsNotEmpty()
    currency: string;

    @IsString()
    @IsNotEmpty()
    companyId: string;
}

class JobDto extends CreateJobDto {
    constructor() { super () };

    @IsBoolean()
    @IsNotEmpty()
    activelyRecruiting: boolean;
}

export class UpdateJobDto extends PartialType(OmitType(JobDto, ["companyId"] as const)) {};