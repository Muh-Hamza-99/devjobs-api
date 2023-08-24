import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class AppGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const clientAuthorization = request.headers["client-authorization"];
    if (!clientAuthorization || clientAuthorization !== process.env.CLIENT_AUTHORIZATION_KEY) return false;
    return true;
  }
}