import * as argon from "argon2";
import * as sendGrid from "@sendgrid/mail";
import * as avatarGenerator from "@fractalsoftware/random-avatar-generator";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { promises as fs } from "fs";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";

import { CompanyLoginDto, CompanyRegisterDto, UserLoginDto, UserRegisterDto, VerifyEmailDto } from "./auth.dtos";
import { cleanResponse, generateVerificationToken } from "src/lib/utilities";
import { PrismaService } from "src/prisma/prisma.service";
import { Payload } from "./auth.types";

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService, private readonly config: ConfigService) {}

    async userRegister(body: UserRegisterDto) {
        try {
            const { username, password, email } = body;
            const hashedPassword = await argon.hash(password);
            const user = await this.prisma.user.create({ data: { username, password: hashedPassword, email } });
            await fs.writeFile(`./uploads/${user.id}.svg`, avatarGenerator.getRandomAvatar());
            return this.signToken(cleanResponse(user));
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") throw new ForbiddenException("This email has already been registered");
            }
        }
    }

    async userLogin(body: UserLoginDto) {
        const { password, email } = body;
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) throw new NotFoundException("User not found");
        if (!(await argon.verify(user.password, password))) throw new ForbiddenException("Invalid credentials");
        return this.signToken(cleanResponse(user));
    }

    async companyRegister(body: CompanyRegisterDto) {
        try {
            const { company, password, email } = body;
            const hashedPassword = await argon.hash(password);
            const registerdCompany = await this.prisma.company.create({ data: { company, password: hashedPassword, email } });
            this.sendVerificationEmail(registerdCompany.id, registerdCompany.email);
            return this.signToken(cleanResponse(registerdCompany))
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") throw new ForbiddenException("This email/company has already been registered");
            }
        }
    };

    async companySendEmail(id: string) {
        const company = await this.prisma.company.findUnique({ where: { id } });
        this.sendVerificationEmail(id, company.email);
        return { status: "success", message: "Email sent" };
    };
    
    async companyVerify(body: VerifyEmailDto, id: string) {
        const company = await this.prisma.company.findUnique({ where: { id } });
        if (!company) throw new NotFoundException("Company not found");
        const { token } = body;
        if (token === company.token) {
            const verifiedCompany = await this.prisma.company.update({ where: { id }, data: { isVerified: true, token: null } });
            return this.signToken(cleanResponse(verifiedCompany));
        } else {
            await this.prisma.company.update({ where: { id }, data: { token: null } });
            return { status: "error", message: "Incorrect token" }
        };
    }
    
    async companyLogin(body: CompanyLoginDto) {
        const { password, email } = body;
        const company = await this.prisma.company.findUnique({ where: { email } });
        if (!company) throw new NotFoundException("Company not found");
        if (!(await argon.verify(company.password, password))) throw new ForbiddenException("Invalid credentials");
        return this.signToken(cleanResponse(company));
    };

    async sendVerificationEmail(id: string, email: string) {
        sendGrid.setApiKey(this.config.get("SENDGRID_API_KEY"));
        const token = generateVerificationToken();
        const message = { to: email, from: this.config.get("SENDGRID_AUTHORISED_SENDER"), subject: "Verify your company!", text: `${token}` };
        sendGrid.send(message)
            .then(async () => {
                await this.prisma.company.update({ where: { id, email }, data: { token }  });
            })
            .catch(() => {
                throw new InternalServerErrorException("Email could not be sent");
            });
    }

    async signToken(payload: Payload): Promise<{ accessToken: string }> {
        const token = await this.jwt.signAsync(payload, { expiresIn: "24d", secret: this.config.get("JWT_SECRET") })
        return { accessToken: token };
    }
}