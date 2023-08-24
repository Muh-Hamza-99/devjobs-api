import { OmitType, PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsString } from "class-validator";
import { IsShortDate } from "src/lib/decorators";

export class CreateEducationDto {
    @IsString()
    @IsNotEmpty()
    university: string;

    @IsString()
    @IsNotEmpty()
    degree: string;

    @IsNotEmpty()
    @IsShortDate("startDate", { message: "Start date is of an invalid date format" })
    startDate: string;

    @IsNotEmpty()
    @IsShortDate("endDate", { message: "End date is of an invalid date format"})
    endDate: string;
    
    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    userId: string
}

export class UpdateEducationDto extends PartialType(OmitType(CreateEducationDto, ["userId"] as const)) {}