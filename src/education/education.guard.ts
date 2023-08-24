import { Injectable, CanActivate, ExecutionContext, NotFoundException } from "@nestjs/common";
import { RequestWithPayload } from "src/auth/auth.types";
import prisma from "src/lib/prisma";

@Injectable()
export class IsEducationOwner implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: RequestWithPayload = context.switchToHttp().getRequest();
    const { id } = request.params;
    const { id: accessorId } = request.user;
    const education = await prisma.education.findUnique({ where: { id } });
    if (!education) throw new NotFoundException("Education not found");
    if (education.userId === accessorId) return true;
    return false;
  }
}