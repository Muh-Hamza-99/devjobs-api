import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";

import { CreateRequirementDto, UpdateRequirementDto } from "./requirement.dtos";
import { PrismaService } from "src/prisma/prisma.service";
import { isObjectEmpty } from "src/lib/utilities";

@Injectable()
export class RequirementService {
    constructor(private readonly prisma: PrismaService) {}

    async createRequirement(body: CreateRequirementDto) {
        const { skill, requiredExperience, description, jobId } = body;
        const job = await this.prisma.job.findUnique({ where: { id: jobId } });
        if (!job) throw new NotFoundException("Job not found");
        const requirement = await this.prisma.requirement.create({ data: { skill: skill.toLowerCase(), requiredExperience, description, jobId } });
        return requirement;
    }

    async getRequirement(id: string) {
        const requirement = await this.prisma.requirement.findUnique({ where: { id } });
        if (!requirement) throw new NotFoundException("Requirement not found");
        return requirement;
    }

    async updateRequirement(body: UpdateRequirementDto, id: string) {
        if (isObjectEmpty(body)) throw new BadRequestException("No data to update");
        const { requiredExperience, description } = body;
        const requirement = await this.prisma.requirement.update({ where: { id }, data: { requiredExperience, description } });
        return requirement;
    }

    async deleteRequirement(id: string) {
        await this.prisma.requirement.delete({ where: { id } });
        return { status: "success" };
    }
}
