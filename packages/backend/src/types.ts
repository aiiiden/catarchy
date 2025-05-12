import { user } from 'prisma/db';

export interface JwtPayload {
  iss: string;
  sub: number;
  aud: string;
  iat: number;
  exp: number;
}

export type AuthUser = Partial<user>;
