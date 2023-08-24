import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { RequestWithPayload } from "./auth.types";

export const Accessor = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: RequestWithPayload = ctx.switchToHttp().getRequest();
    return request.user;
  },
);