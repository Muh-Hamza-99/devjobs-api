import { BadRequestException, Injectable, NotFoundException, StreamableFile } from "@nestjs/common";
import { createReadStream, promises as fs } from "fs";
import { Response } from "express";

import { UpdateCompanyDto, UploadLogoDto } from "./company.dtos";
import { cleanResponse, isObjectEmpty } from "src/lib/utilities";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CompanyService {
    constructor(private readonly prisma: PrismaService) {};

    async getCompany(id: string) {
        const company = await this.prisma.company.findUnique({ where: { id }, include: { jobs: true } });
        if (!company) throw new NotFoundException("Company not found");
        return cleanResponse(company);
    }

    async updateCompany(body: UpdateCompanyDto, id: string) {
        if (isObjectEmpty(body)) throw new BadRequestException("No data to update");
        const { description, industry, location, website } = body;
        const company = await this.prisma.company.update({ where: { id }, data: { description, industry, location, website } });
        return company;
    }
    
    async getLogo(response: Response, id: string) {
        const company = await this.prisma.company.findUnique({ where: { id } });
        if (!company.logo) throw new NotFoundException("Logo not found");
        response.set({ "Content-Type": `image/${company.logo.split(".")[2]}` });
        const stream = createReadStream(company.logo);
        return new StreamableFile(stream);
    }

    async uploadLogo(body: UploadLogoDto, id: string) {
        const { logo } = body;
        const pathname = `./uploads/${id}.webp`;
        console.log(pathname, id);
        fs.mkdir(`./uploads`, { recursive: true }).then(async () => await fs.writeFile(pathname, logo.buffer, "utf-8"));
        return { status: "success" };
    }

    async deleteCompany(id: string) {
        const company = await this.prisma.company.delete({ where: { id } });
        await fs.unlink(company.logo);
        return { status: "success" };
    }
}