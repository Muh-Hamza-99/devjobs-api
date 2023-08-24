import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, NotFoundException } from "@nestjs/common";
import { RequestWithPayload } from "src/auth/auth.types";
import prisma from "src/lib/prisma";

@Injectable()
export class IsCompanyOwner implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: RequestWithPayload = context.switchToHttp().getRequest();
    const { id } = request.params;
    const { id: accessorId } = request.user;
    const company = await prisma.company.findUnique({ where: { id } });
    if (!company) throw new NotFoundException("Company not found");
    if (company.id === accessorId) return true;
    return false;
  }
}

@Injectable()
export class IsVerified implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: RequestWithPayload = context.switchToHttp().getRequest();
    const { id } = request.user;
    const company = await prisma.company.findUnique({ where: { id } });
    if (!company) return true;
    if (!company.isVerified) throw new UnauthorizedException("Company not verified");
    return true;
  }
}