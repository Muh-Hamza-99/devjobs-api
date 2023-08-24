import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CreateRequirementDto, UpdateRequirementDto } from "./requirement.dtos";
import { RequirementService } from "./requirement.service";
import { IsRequirementOwner } from "./requirement.guard";
import { JwtGuard } from "src/auth/auth.guard";

@Controller("requirements")
export class RequirementController {
    constructor(private readonly requirementService: RequirementService) {}

    @Post()
    createRequirement(@Body() body: CreateRequirementDto) {
        return this.requirementService.createRequirement(body);
    }

    @Get(":id")
    getRequirement(@Param("id") id: string) {
        return this.requirementService.getRequirement(id);
    }

    @UseGuards(JwtGuard, IsRequirementOwner)
    @Patch(":id")
    updateRequirement(@Body() body: UpdateRequirementDto, @Param("id") id: string) {
        return this.requirementService.updateRequirement(body, id);
    }

    @UseGuards(JwtGuard, IsRequirementOwner)
    @Delete(":id")
    deleteRequirement(@Param("id") id: string) {
        return this.requirementService.deleteRequirement(id);
    }
}
