import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { user } from 'prisma/db';

/**
 *
 * @summary
 * Request 객체에서 유저 정보를 추출합니다. request 객체에 user 를 inject 하는 주체는
 * @linkcode src/common/guards/auth.guard.ts 입니다.
 */
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Partial<user> | null => {
    const request = ctx.switchToHttp().getRequest();
    return request.parsedPayload ? request.parsedPayload.user : null;
  },
);
