import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";

import { CreateExperienceDto, UpdateExperienceDto } from "./experience.dtos";
import { PrismaService } from "src/prisma/prisma.service";
import { isObjectEmpty } from "src/lib/utilities";

@Injectable()
export class ExperienceService {
    constructor(private readonly prisma: PrismaService) {}

    async createExperience(body: CreateExperienceDto) {
        const { title, startDate, endDate, description, userId } = body;
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new NotFoundException("User not found!");
        const experience = await this.prisma.experience.create({ data: { title, startDate, endDate, description, userId } });
        return experience;
    }

    async getExperience(id: string) {
        const experience = await this.prisma.experience.findUnique({ where: { id } });
        if (!experience) throw new NotFoundException("Experience not found");
        return experience;
    }

    async updateExperience(body: UpdateExperienceDto, id: string) {
        if (isObjectEmpty(body)) throw new BadRequestException("No data to update");
        const { title, startDate, endDate, description } = body;
        const experience = await this.prisma.experience.update({ where: { id }, data: { title, endDate, startDate, description } });
        return experience;
    }

    async deleteExperience(id: string) {
        await this.prisma.experience.deleteMany({ where: { id } });
        return { status: "success" };
    }
}
