import { Injectable, CanActivate, ExecutionContext, NotFoundException } from "@nestjs/common";
import { RequestWithPayload } from "src/auth/auth.types";
import prisma from "src/lib/prisma";

@Injectable()
export class IsSkillOwner implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: RequestWithPayload = context.switchToHttp().getRequest();
    const { id } = request.params;
    const { id: accessorId } = request.user;
    const skill = await prisma.skill.findUnique({ where: { id } });
    if (!skill) throw new NotFoundException("Skill not found");
    if (skill.userId === accessorId) return true;
    return false;
  }
}