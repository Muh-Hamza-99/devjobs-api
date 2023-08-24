import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";

import { CreateExperienceDto, UpdateExperienceDto } from "./experience.dtos";
import { ExperienceService } from "./experience.service";
import { IsExperienceOwner } from "./experience.guard";
import { JwtGuard } from "src/auth/auth.guard";

@Controller("experiences")
export class ExperienceController {
    constructor(private readonly experienceService: ExperienceService) {}
    
    @Post()
    createExperience(@Body() body: CreateExperienceDto) {
        return this.experienceService.createExperience(body);
    }

    @Get(":id")
    getExperience(@Param("id") id: string) {
        return this.experienceService.getExperience(id);
    }

    @UseGuards(JwtGuard, IsExperienceOwner)
    @Patch(":id")
    updateExperience(@Body() body: UpdateExperienceDto, @Param("id") id: string) {
        return this.experienceService.updateExperience(body, id);
    }

    @UseGuards(JwtGuard, IsExperienceOwner)
    @Delete(":id")
    deleteExperience(@Param("id") id: string) {
        return this.experienceService.deleteExperience(id);
    }
}
