import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";

import { CreateEducationDto, UpdateEducationDto } from "./education.dtos";
import { EducationService } from "./education.service";
import { IsEducationOwner } from "./education.guard";
import { JwtGuard } from "src/auth/auth.guard";

@Controller("educations")
export class EducationController {
    constructor(private readonly educationService: EducationService) {}

    @Post()
    createEducation(@Body() body: CreateEducationDto) {
        return this.educationService.createEducation(body);
    }

    @Get(":id")
    getEducation(@Param("id") id: string) {
        return this.educationService.getEducation(id);
    }

    @UseGuards(JwtGuard, IsEducationOwner)
    @Patch(":id")
    updateEducation(@Body() body: UpdateEducationDto, @Param("id") id: string) {
        return this.educationService.updateEducation(body, id);
    }

    @UseGuards(JwtGuard, IsEducationOwner)
    @Delete(":id")
    deleteEducation(@Param("id") id: string) {
        return this.educationService.deleteEducation(id);
    }
}
