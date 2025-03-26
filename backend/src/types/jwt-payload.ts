import { UserRole } from 'src/users/types/user-role';

export type JwtPayload = {
  sub: string;
  email: string;
  role: UserRole;
};
