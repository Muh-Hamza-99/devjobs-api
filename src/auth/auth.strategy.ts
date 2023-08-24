import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { cleanResponse } from "src/lib/utilities";

import { PrismaService } from "src/prisma/prisma.service";
import { Payload } from "./auth.types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor(config: ConfigService, private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get("JWT_SECRET")
        });
    }
    async validate(payload: Payload) {
        if (payload.hasOwnProperty("username")) {
            const user = await this.prisma.user.findUnique({ where: { id: payload.id } });
            if (!user) return null;
            return cleanResponse(user)
        };
        if (payload.hasOwnProperty("company")) {
            const company = await this.prisma.company.findUnique({ where: { id: payload.id }});
            if (!company) return null;
            return cleanResponse(company)
        };
    };
}