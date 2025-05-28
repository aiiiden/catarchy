// src/common/guards/auth.guard.ts
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '@providers/database/database.service';
import { Request } from 'express';

import { user } from 'prisma/db';
import { JwtPayload } from 'src/types';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly databaseService: DatabaseService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    /* 1. Public API 면 바로 통과 */
    if (this.isPublic(context)) return true;

    /* 2. 헤더에서 Bearer 토큰 추출 */
    const token = this.extractToken(req);
    if (!token) throw new BadRequestException('No auth token provided');

    /* 3. JWT 검증 */
    const payload = await this.verifyJwt(token);

    /* 4. DB 에 사용자 존재 확인 */
    const user = await this.loadUser(payload);

    /* 5. request 에 주입 → 이후 서비스/컨트롤러에서 사용 */
    (req as any).parsedPayload = { payload, user, token };
    return true;
  }

  /* ---------- helpers --------------------------------------------------- */

  private isPublic(ctx: ExecutionContext): boolean {
    return !!this.reflector.getAllAndOverride<boolean>('isPublic', [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
  }

  private extractToken(req: Request): string | null {
    const auth = req.headers.authorization ?? '';
    const [type, token] = auth.split(' ');
    return type === 'Bearer' ? token : null;
  }

  private async verifyJwt(token: string): Promise<JwtPayload> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
        ignoreExpiration: false,
      });
    } catch {
      throw new UnauthorizedException('Invalid auth token');
    }
  }

  private async loadUser(payload: JwtPayload): Promise<Partial<user>> {
    const user: user | null = await this.databaseService.user.findUnique({
      where: { id: payload.sub }, // sub = userId
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }
}
