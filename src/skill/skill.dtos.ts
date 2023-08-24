import { IsInt, IsNotEmpty, IsString, Max, MaxLength, Min, MinLength } from "class-validator";
import { OmitType } from "@nestjs/mapped-types";

export class CreateSkillDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(20)
    skill: string;

    @IsInt()
    @IsNotEmpty()
    @Min(1)
    @Max(20)
    yearsOfExperience: number;

    @IsString()
    @IsNotEmpty()
    userId: string;
}

export class UpdateSkillDto extends OmitType(CreateSkillDto, ["skill", "userId"] as const) {}