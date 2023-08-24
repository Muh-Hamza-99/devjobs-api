import { Company, User } from "@prisma/client";
import { Request } from "express";

export type Payload = Omit<User, "password"> | Omit<Company, "password" | "token">;

export interface RequestWithPayload extends Request {
    user: Payload
};