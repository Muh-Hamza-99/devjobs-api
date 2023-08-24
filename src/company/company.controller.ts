import { Body, Controller, Delete, Get, Param, Patch, Res, UseGuards } from "@nestjs/common";
import { FormDataRequest } from "nestjs-form-data";
import { Response } from "express";

import { UpdateCompanyDto, UploadLogoDto } from "./company.dtos";
import { IsCompanyOwner, IsVerified } from "./company.guard";
import { CompanyService } from "./company.service";
import { JwtGuard } from "src/auth/auth.guard";

@Controller("companies")
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {};

    @Get(":id")
    getCompany(@Param("id") id: string) {
        return this.companyService.getCompany(id);
    }

    @Get(":id/get-logo")
    getLogo(@Res({ passthrough: true }) response: Response, @Param("id") id: string) {
        return this.companyService.getLogo(response, id);
    }

    @UseGuards(JwtGuard, IsCompanyOwner, IsVerified)
    @Patch(":id")
    updateCompany(@Body() body: UpdateCompanyDto, @Param("id") id: string) {
        return this.companyService.updateCompany(body, id);
    }

    @UseGuards(JwtGuard, IsCompanyOwner, IsVerified)
    @Patch(":id/upload-logo")
    @FormDataRequest()
    uploadLogo(@Body() body: UploadLogoDto, @Param("id") id: string) {
        return this.companyService.uploadLogo(body, id);
    }

    @UseGuards(JwtGuard, IsCompanyOwner)
    @Delete(":id")
    deleteCompany(@Param("id") id: string) {
        return this.companyService.deleteCompany(id);
    }
}