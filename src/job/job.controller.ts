import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";

import { AlreadyApplied, IsJobOwner, IsUser } from "./job.guard";
import { CreateJobDto, UpdateJobDto } from "./job.dtos";
import { IsVerified } from "src/company/company.guard";
import { Accessor } from "src/auth/auth.decorator";
import { JwtGuard } from "src/auth/auth.guard";
import { Payload } from "src/auth/auth.types";
import { JobService } from "./job.service";

@Controller("jobs")
export class JobController {
    constructor(private readonly jobService: JobService) {};

    @UseGuards(JwtGuard, IsVerified)
    @Post()
    createJob(@Body() body: CreateJobDto) {
        return this.jobService.createJob(body);
    }
    
    @Get(":id")
    getJob(@Param("id") id: string) {
        return this.jobService.getJob(id);
    }
    
    @UseGuards(JwtGuard, IsJobOwner)
    @Patch(":id")
    updateJob(@Body() body: UpdateJobDto, @Param("id") id: string) {
        return this.jobService.updateJob(body, id);
    }

    @UseGuards(JwtGuard, IsUser, AlreadyApplied)
    @Patch(":id/apply")
    applyToJob(@Param("id") id: string, @Accessor() accessor: Payload) {
        return this.jobService.applyToJob(id, accessor);
    }

    @UseGuards(JwtGuard, IsJobOwner)
    @Delete(":id")
    deleteJob(@Param("id") id: string) {
        return this.jobService.deleteJob(id);
    }
}
