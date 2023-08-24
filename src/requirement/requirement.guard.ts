import { Injectable, CanActivate, ExecutionContext, NotFoundException } from "@nestjs/common";
import { RequestWithPayload } from "src/auth/auth.types";
import prisma from "src/lib/prisma";

@Injectable()
export class IsRequirementOwner implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: RequestWithPayload = context.switchToHttp().getRequest();
    const { id } = request.params;
    const { id: accessorId } = request.user;
    const requirement = await prisma.requirement.findUnique({ where: { id } });
    if (!requirement) throw new NotFoundException("Requirement not found");
    const job = await prisma.job.findUnique({ where: { id: requirement.jobId }});
    if (job.companyId === accessorId) return true;
    return false;
  }
}