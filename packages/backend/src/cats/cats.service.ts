// src/cats/cats.service.ts
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { PostVirtuesDto } from './dtos/post-virtues.dto';

@Injectable()
export class CatsService {
  constructor(private db: DatabaseService) {}

  /* ───────── ① 성격 테스트 → Cat 생성 ───────── */
  async createWithVirtues(dto: PostVirtuesDto, userId: number) {
    return await this.db.cat.create({
      data: {
        ...dto,
        emotionScore: 100,
        growth: 0,
        user: { connect: { id: userId } },
      },
    });
  }

  /* ───────── ② 민트 후 tokenId 업데이트 ───────── */
  async registerMint(
    tokenId: bigint,
    birthBlock: bigint,
    mintTx: string,
    userId: number,
  ) {
    const cat = await this.db.cat.findFirst({
      where: { userId, tokenId: null },
      orderBy: { createdAt: 'desc' },
    });
    if (!cat) throw new BadRequestException('No cat awaiting mint');

    return await this.db.cat.update({
      where: { id: cat.id },
      data: {
        tokenId,
        birthBlock,
        mintTx,
        mintedAt: new Date(),
      },
    });
  }

  /* ───────── ③ Care 로직 (쿨타임/감정 감소 정책 적용) ───────── */
  async care(catId: number, userId: number) {
    const cat = await this.db.cat.findUniqueOrThrow({ where: { id: catId } });
    if (cat.userId !== userId) throw new ForbiddenException();

    /* 정책 로드 */
    const careRow = await this.db.systemPolicy.findUnique({
      where: { key: 'care' },
    });
    const emoRow = await this.db.systemPolicy.findUnique({
      where: { key: 'emotion' },
    });

    const { cooldownH } = (careRow?.value as { cooldownH: number }) ?? {
      cooldownH: 2,
    };
    const { decayIntervalH, decayValue } = (emoRow?.value as {
      decayIntervalH: number;
      decayValue: number;
    }) ?? {
      decayIntervalH: 6,
      decayValue: 10,
    };

    // 쿨타임
    if (Date.now() - +cat.lastCareAt < cooldownH * 3_600_000)
      throw new BadRequestException('Care cooldown');

    // 감정 감소 계산
    const hours = (Date.now() - +cat.lastEmotionAt) / 3_600_000;
    const steps = Math.floor(hours / decayIntervalH);
    const decayed = Math.max(0, cat.emotionScore - steps * decayValue);

    // 보너스 + 기록
    const newEmotion = Math.min(100, decayed + 10);
    const growthDelta = 1;

    const [updCat, careEvent] = await this.db.$transaction([
      this.db.cat.update({
        where: { id: catId },
        data: {
          emotionScore: newEmotion,
          growth: cat.growth + growthDelta,
          lastEmotionAt: new Date(),
          lastCareAt: new Date(),
        },
      }),
      this.db.careEvent.create({
        data: {
          catId,
          growthDelta,
          emotionBefore: cat.emotionScore,
          emotionAfter: newEmotion,
        },
      }),
    ]);

    return { cat: updCat, careEvent };
  }

  /* ───────── ④ 유틸 → 내 고양이, 히스토리 ───────── */
  async listMyCats(userId: number) {
    return this.db.cat.findMany({ where: { userId } });
  }

  async getHistory(catId: number, days: number) {
    const since = new Date(Date.now() - days * 24 * 3600_000);
    return this.db.catEmotionLog.findMany({
      where: { catId, recordedAt: { gte: since } },
      orderBy: { recordedAt: 'asc' },
    });
  }
}
