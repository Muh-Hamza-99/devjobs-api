import { Injectable, CanActivate, ExecutionContext, NotFoundException } from "@nestjs/common";
import { RequestWithPayload } from "src/auth/auth.types";
import prisma from "src/lib/prisma";

@Injectable()
export class IsExperienceOwner implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: RequestWithPayload = context.switchToHttp().getRequest();
    const { id } = request.params;
    const { id: accessorId } = request.user;
    const experience = await prisma.experience.findUnique({ where: { id } });
    if (!experience) throw new NotFoundException("Experience not found");
    if (experience.userId === accessorId) return true;
    return false;
  }
}