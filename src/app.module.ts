import { Module, UseGuards } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./user/user.module";
import { ExperienceModule } from "./experience/experience.module";
import { EducationModule } from "./education/education.module";
import { SkillModule } from "./skill/skill.module";
import { CompanyModule } from "./company/company.module";
import { JobModule } from "./job/job.module";
import { RequirementModule } from './requirement/requirement.module';
import { MemoryStoredFile, NestjsFormDataModule } from "nestjs-form-data";

@Module({
  imports: [
    NestjsFormDataModule.config({ isGlobal: true, storage: MemoryStoredFile }),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    UserModule,
    ExperienceModule,
    EducationModule,
    SkillModule,
    CompanyModule,
    JobModule,
    RequirementModule,
  ],
})
export class AppModule {}