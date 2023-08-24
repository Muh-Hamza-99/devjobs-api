import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";

import { CreateSkillDto, UpdateSkillDto } from "./skill.dtos";
import { SkillService } from "./skill.service";
import { IsSkillOwner } from "./skill.guard";
import { JwtGuard } from "src/auth/auth.guard";

@Controller("skills")
export class SkillController {
    constructor(private readonly skillService: SkillService) {}

    @Post()
    createSkill(@Body() body: CreateSkillDto) {
        return this.skillService.createSkill(body);
    }

    @Get(":id")
    getSkill(@Param("id") id: string) {
        return this.skillService.getSkill(id);
    }

    @UseGuards(JwtGuard, IsSkillOwner)
    @Patch(":id")
    updateSkill(@Body() body: UpdateSkillDto, @Param("id") id: string) {
        return this.skillService.updateSkill(body, id);
    }

    @UseGuards(JwtGuard, IsSkillOwner)
    @Delete(":id")
    deleteskill(@Param("id") id: string) {
        return this.skillService.deleteSkill(id);
    }
}
