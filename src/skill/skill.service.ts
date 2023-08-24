import { Injectable, NotFoundException } from "@nestjs/common";

import { CreateSkillDto, UpdateSkillDto } from "./skill.dtos";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SkillService {
    constructor(private readonly prisma: PrismaService) {}

    async createSkill(body: CreateSkillDto) {
        const { skill, yearsOfExperience, userId } = body;
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new NotFoundException("User not found!");
        const userSkill = await this.prisma.skill.create({ data: { skill: skill.toLowerCase(), yearsOfExperience, userId } });
        return userSkill;
    }

    async getSkill(id: string) {
        const skill = await this.prisma.skill.findUnique({ where: { id } });
        if (!skill) throw new NotFoundException("Skill not found");
        return skill;
    }

    async updateSkill(body: UpdateSkillDto, id: string) {
        const { yearsOfExperience } = body;
        const skill = await this.prisma.skill.update({ where: { id }, data: { yearsOfExperience } });
        return skill;
    }

    async deleteSkill(id: string) {
        await this.prisma.skill.delete({ where: { id } });
        return { status: "success" };
    }
}
