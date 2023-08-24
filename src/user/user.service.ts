import { BadRequestException, Injectable, NotFoundException, StreamableFile } from "@nestjs/common";
import { createReadStream, existsSync, promises as fs } from "fs";
import { Response } from "express";

import { cleanResponse, isObjectEmpty } from "src/lib/utilities";
import { UpdateUserDto, UploadResumeDto } from "./user.dtos";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {};

    async getUser(id: string) {
        const user = await this.prisma.user.findUnique({ where: { id }, include: { education: true, experiences: true, skills: true, appliedToJobs: true } });
        if (!user) throw new NotFoundException("User not found!");
        return cleanResponse(user);
    }

    async updateUser(body: UpdateUserDto, id: string) {
        if (isObjectEmpty(body)) throw new BadRequestException("No data to update!");
        const { github, linkedin, website } = body;
        const user = await this.prisma.user.update({ where: { id }, data: { github, linkedin, website }  });
        return user;
    }

    async getResume(response: Response, id: string) {
        if (!existsSync(`./uploads/${id}.pdf`)) throw new NotFoundException("Resume not found");
        response.set({ "Content-Type": "application/pdf", "Content-Disposition": "attachment; filename=Resume.pdf" })
        const stream = createReadStream(`./uploads/${id}.pdf`);
        return new StreamableFile(stream);
    }

    async getProfilePicture(response: Response, id: string) {
        response.set({ "Content-Type": "image/svg+xml" });
        const stream = createReadStream(`./uploads/${id}.svg`);
        return new StreamableFile(stream);
    } 

    async uploadResume(body: UploadResumeDto, id: string) {
        const { resume } = body;
        const user = await this.prisma.user.findUnique({ where: { id } });
        const pathname = `./uploads/${user.id}.pdf`;
        fs.mkdir(`./uploads`, { recursive: true }).then(async () => await fs.writeFile(pathname, resume.buffer, "utf-8"));
        return { status: "success" };
    }

    async deleteUser(id: string) {
        await this.prisma.user.delete({ where: { id } });
        await fs.unlink(`./uploads/${id}.svg`);
        if (existsSync(`./uploads/${id}.pdf`)) await fs.unlink(`./uploads/${id}.pdf`);
        return { status: "success" };
    }
}