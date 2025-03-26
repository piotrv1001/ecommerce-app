import { UserRole } from "./user-role";

export type JwtPayload = {
  sub: string;
  email: string;
  role: UserRole;
};
