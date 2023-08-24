import { Injectable, CanActivate, ExecutionContext, NotFoundException } from "@nestjs/common";

import { RequestWithPayload } from "src/auth/auth.types";
import prisma from "src/lib/prisma";

@Injectable()
export class IsUserOwner implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: RequestWithPayload = context.switchToHttp().getRequest();
    const { id } = request.params;
    const { id: accessorId } = request.user;
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException("User not found");
    if (user.id === accessorId) return true;
    return false;
  }
}