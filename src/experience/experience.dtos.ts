import { OmitType, PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

import { IsShortDate } from "src/lib/decorators";

export class CreateExperienceDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(30)
    title: string;

    @IsNotEmpty()
    @IsShortDate("startDate", { message: "Start date is of an invalid date format" })
    startDate: string;

    @IsNotEmpty()
    @IsShortDate("endDate", { message: "End date is of an invalid date format" })
    endDate: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(300)
    description: string;

    @IsString()
    @IsNotEmpty()
    userId: string;
}

export class UpdateExperienceDto extends PartialType(OmitType(CreateExperienceDto, ["userId"] as const)) {};