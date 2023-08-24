import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";

import { CreateEducationDto, UpdateEducationDto } from "./education.dtos";
import { PrismaService } from "src/prisma/prisma.service";
import { isObjectEmpty } from "src/lib/utilities";

@Injectable()
export class EducationService {
    constructor(private readonly prisma: PrismaService) {}

    async createEducation(body: CreateEducationDto) {
        const { university, degree, startDate, endDate, description, userId } = body;
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new NotFoundException("User not found!");
        const education = await this.prisma.education.create({ data: { university, degree, startDate, endDate, description, userId } });
        return education;
    }

    async getEducation(id: string) {
        const education = await this.prisma.education.findUnique({ where: { id } });
        if (!education) throw new NotFoundException("Education not found");
        return education;
    }

    async updateEducation(body: UpdateEducationDto, id: string) {
        if (isObjectEmpty(body)) throw new BadRequestException("No data to update");
        const { university, degree, startDate, endDate, description } = body;
        const education = await this.prisma.education.update({ where: { id }, data: { university, degree, endDate, startDate, description } });
        return education;
    }

    async deleteEducation(id: string) {
        await this.prisma.education.deleteMany({ where: { id } });
        return { status: "success" };
    }
}
