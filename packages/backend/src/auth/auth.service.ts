import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import { addMinutes } from 'date-fns';
import { verifyTypedData, Address } from 'viem';

import { DatabaseService } from '../database/database.service';
import { getTypedData } from '../lib/web3';
import { PostChallengeDto } from './dtos/post-challenge.dto';
import { PostVerifyDto } from './dtos/post-verify.dto';
import { PatchHandleDto } from './dtos/patch-handle.dto';

@Injectable()
export class AuthService {
  private readonly log = new Logger(AuthService.name);

  constructor(
    private readonly db: DatabaseService,
    private readonly jwt: JwtService,
  ) {}

  /* 디버그용 */
  getAllUsers() {
    return this.db.user.findMany({
      select: { id: true, walletAddress: true, handle: true },
    });
  }

  /* ① Nonce 발급 */
  async createChallenge({ walletAddress }: PostChallengeDto) {
    const nonce = randomBytes(32).toString('hex');

    const ch = await this.db.authChallenge.create({
      data: {
        walletAddress: walletAddress.toLowerCase(),
        nonce,
        expiresAt: addMinutes(new Date(), process.env.AUTH_CHAL_TTL_MIN),
      },
    });

    return ch.nonce;
  }

  /* ② 검증 + 회원가입/로그인 (단일 트랜잭션) */
  async verify(dto: PostVerifyDto) {
    return this.db.$transaction(async (tx) => {
      const ch = await tx.authChallenge.findUnique({
        where: { id: dto.challengeId },
      });
      if (!ch || ch.usedAt || Date.now() > +ch.expiresAt)
        throw new ForbiddenException('Challenge invalid');

      const typed = getTypedData({
        address: dto.walletAddress.toLowerCase() as Address,
        nonce: `0x${ch.nonce}`,
        issued: BigInt(Math.floor(ch.issuedAt.getTime() / 1000)),
      });

      const ok = await verifyTypedData({
        domain: typed.domain,
        types: typed.types,
        primaryType: typed.primaryType,
        message: typed.message,
        address: dto.walletAddress.toLowerCase() as Address,
        signature: dto.signature as `0x${string}`,
      });

      // 사용 처리 ※ 실패/성공 동일 시도 → 중복 방어
      await tx.authChallenge.update({
        where: { id: ch.id },
        data: { usedAt: new Date() },
      });

      if (!ok) throw new ForbiddenException('Signature mismatch');

      const user = await tx.user.upsert({
        where: { walletAddress: dto.walletAddress.toLowerCase() },
        update: {},
        create: { walletAddress: dto.walletAddress.toLowerCase() },
        select: { id: true, walletAddress: true, handle: true },
      });

      const token = this.jwt.sign(
        { sub: user.id, aud: String(user.id) },
        {
          issuer: process.env.AUTH_JWT_ISSUER,
          expiresIn: process.env.AUTH_JWT_EXP,
        },
      );

      this.log.debug(`login user=${user.id}`);
      return { token, user };
    });
  }

  async updateHandle(userId: number, { handle }: PatchHandleDto) {
    // -- optional uniqueness check (throw 409 if duplicate) --
    const dup = await this.db.user.findUnique({ where: { handle } });
    if (dup && dup.id !== userId)
      throw new ForbiddenException('Handle already taken');

    return this.db.user.update({
      where: { id: userId },
      data: { handle },
      select: { id: true, walletAddress: true, handle: true },
    });
  }
}
