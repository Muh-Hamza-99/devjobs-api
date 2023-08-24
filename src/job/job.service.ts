import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";
import { CreateJobDto, UpdateJobDto } from "./job.dtos";
import { isObjectEmpty } from "src/lib/utilities";
import { Payload } from "src/auth/auth.types";

@Injectable()
export class JobService {
    constructor(private readonly prisma: PrismaService) {};

    async createJob(body: CreateJobDto) {
        const { title, description, location, experienceLevel, monthlySalary, currency, companyId } = body;
        const company = await this.prisma.company.findUnique({ where: { id: companyId } });
        if (!company) throw new NotFoundException("Company not found");
        const job = await this.prisma.job.create({ data: { title, description, location, experienceLevel, monthlySalary, currency, companyId } });
        return job;
    }

    async getJob(id: string) {
        const job = await this.prisma.job.findUnique({ where: { id }, include: { requirements: true, applicants: true } });
        if (!job) throw new NotFoundException("Job not found");
        return job;
    }

    async updateJob(body: UpdateJobDto, id: string) {
        if (isObjectEmpty(body)) throw new BadRequestException("No data to update");
        const { title, description, location, experienceLevel, monthlySalary, currency, activelyRecruiting } = body;
        const job = await this.prisma.job.update({ where: { id }, data: { title, description, location, experienceLevel, monthlySalary, currency, activelyRecruiting } });
        return job;
    }

    async applyToJob(id: string, accessor: Payload) {
        const user = await this.prisma.user.findUnique({ where: { id: accessor.id } });
        if (!user) throw new NotFoundException("User not found");
        await this.prisma.job.update({ where: { id }, data: { applicants: { connect: [user] } } });
        return { status: "success" };
    }

    async deleteJob(id: string) {
        await this.prisma.job.delete({ where: { id } });
        return { status: "success" };
    }
}