import { IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min, MinLength } from "class-validator";
import { OmitType, PartialType } from "@nestjs/mapped-types";

export class CreateRequirementDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(20)
    skill: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Max(10)
    requiredExperience: number;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(200)
    description: string;

    @IsString()
    @IsNotEmpty()
    jobId: string;
}

export class UpdateRequirementDto extends PartialType(OmitType(CreateRequirementDto, ["jobId", "skill"])) {}