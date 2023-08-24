import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UseGuards } from "@nestjs/common";
import { FormDataRequest } from "nestjs-form-data";
import { Response } from "express";

import { UpdateUserDto, UploadResumeDto } from "./user.dtos";
import { JwtGuard } from "src/auth/auth.guard";
import { UserService } from "./user.service";
import { IsUserOwner } from "./user.guard";

@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(":id")
    getUser(@Param("id") id: string) {
        return this.userService.getUser(id);
    }

    @UseGuards(JwtGuard, IsUserOwner)
    @Patch(":id")
    updateUser(@Body() body: UpdateUserDto, @Param("id") id: string) {
        return this.userService.updateUser(body, id);
    }

    @Get(":id/get-resume")
    getResume(@Res({ passthrough: true }) response: Response, @Param("id") id: string) {
        return this.userService.getResume(response, id);
    }

    @Get(":id/get-profile-picture")
    getProfilePicture(@Res({ passthrough: true }) response: Response, @Param("id") id: string) {
        return this.userService.getProfilePicture(response, id);
    }

    @UseGuards(JwtGuard, IsUserOwner)
    @Post(":id/upload-resume")
    @FormDataRequest()
    uploadResume(@Body() body: UploadResumeDto, @Param("id") id: string) {
        return this.userService.uploadResume(body, id);
    }

    @UseGuards(JwtGuard, IsUserOwner)
    @Delete(":id")
    deleteUser(@Param("id") id: string) {
        return this.userService.deleteUser(id);
    }
}
