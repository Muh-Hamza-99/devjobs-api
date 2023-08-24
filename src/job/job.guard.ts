import { Injectable, CanActivate, ExecutionContext, ForbiddenException, NotFoundException } from "@nestjs/common";
import { RequestWithPayload } from "src/auth/auth.types";
import prisma from "src/lib/prisma";

@Injectable()
export class IsJobOwner implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: RequestWithPayload = context.switchToHttp().getRequest();
    const { id } = request.params;
    const { id: accessorId } = request.user;
    const job = await prisma.job.findUnique({ where: { id } });
    if (!job) throw new NotFoundException("Job not found");
    if (job.companyId === accessorId) return true;
    return false;
  }
}

@Injectable()
export class IsUser implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: RequestWithPayload = context.switchToHttp().getRequest();
    if (request.user.hasOwnProperty("username")) return true;
    throw new ForbiddenException("Users can only apply to jobs");
  }
}

@Injectable()
export class AlreadyApplied implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: RequestWithPayload = context.switchToHttp().getRequest();
    const { id } = request.params;
    const { id: accessorId } = request.user;
    const { appliedToJobs } = await prisma.user.findUnique({ where: { id: accessorId }, select: { appliedToJobs: true } });
    appliedToJobs.forEach(job => { if (job.id === id) throw new ForbiddenException("You have already applied to this job") });
    return true;
  }
}