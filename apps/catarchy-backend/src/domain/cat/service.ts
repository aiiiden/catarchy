import { claude } from "../../infra/ai";
import { ConflictError, NotFoundError } from "../../lib/error";
import { ConsensusRepository } from "../consensus/repository";
import { CareRecordRepository } from "./care-record.repository";
import { CatStatRepository } from "./cat-stat.repository";
import { getEmotion } from "./constants/emotion";
import { getAgeGroup } from "./constants/growth";
import { buildCarePrompt } from "./prompts/care";
import { CatRepository } from "./repository";

export abstract class CatService {
  private static catRepository = CatRepository;
  private static catStatRepository = CatStatRepository;
  private static careRecordRepository = CareRecordRepository;
  private static consensusRepository = ConsensusRepository;

  static async getCatInfo({ userId }: { userId: string }) {
    const cat = await this.catRepository.findWithStatByServantId({
      servantId: userId,
    });

    if (!cat) {
      throw new NotFoundError("Cat not found for the user.");
    }

    return {
      id: cat.cat.id,
      name: cat.cat.name,
      stat: {
        growth: cat.stat.growth,
        emotion: cat.stat.emotion,
      },
    };
  }

  static async summonCat({ userId, name }: { userId: string; name: string }) {
    const existingCat = await this.catRepository.findByServantId({
      servantId: userId,
    });

    if (existingCat) {
      throw new ConflictError("You already have a cat.");
    }

    // 고양이 생성
    const newCatId = crypto.randomUUID();

    // D1 batch does not support RETURNING, so run separately
    const [newCat] = await this.catRepository.create({
      id: newCatId,
      servantId: userId,
      name,
    });
    await this.catStatRepository.create({
      catId: newCatId,
      growth: 0,
      emotion: 100,
    });

    return {
      id: newCat.id,
      name: newCat.name,
      servantId: newCat.servantId,
    };
  }

  static async careForCat({ userId }: { userId: string }) {
    // 1) 고양이 + 스탯 + 성격 + consensus 값 병렬 조회
    const [catFull, [cooldownHour, growthPerCare, emotionPerCare]] =
      await Promise.all([
        this.catRepository.findFullByServantId({ servantId: userId }),
        Promise.all([
          this.consensusRepository.getValue("CAT.COOLDOWN_HOUR_BETWEEN_CARE"),
          this.consensusRepository.getValue("CAT.GROWTH_PER_CARE"),
          this.consensusRepository.getValue("CAT.EMOTION_PER_CARE"),
        ]),
      ]);

    if (!catFull) {
      throw new NotFoundError("You don't have a cat to care for.");
    }

    const { cat, stat: catStat, personality } = catFull;

    // 2) 쿨다운 체크
    if (cat.lastCaredAt) {
      const lastCaredAt = new Date(cat.lastCaredAt);
      const now = new Date();
      const hoursSinceLastCare =
        (now.getTime() - lastCaredAt.getTime()) / (1000 * 60 * 60);

      if (hoursSinceLastCare < cooldownHour) {
        const remainingHours = Math.ceil(cooldownHour - hoursSinceLastCare);
        throw new ConflictError("Care is on cooldown.", {
          remainingHours,
        });
      }
    }

    // 3) 스탯 업데이트 + 마지막 돌봄 시간 업데이트
    // D1 batch does not support RETURNING, so run separately
    const newGrowth = catStat.growth + growthPerCare;
    const newEmotion = Math.min(catStat.emotion + emotionPerCare, 100);

    await this.catRepository.updateLastCaredAt({ catId: cat.id });
    const [updatedCatStat] = await this.catStatRepository.updateAfterCare({
      catId: cat.id,
      growth: newGrowth,
      emotion: newEmotion,
    });

    // 4) AI 메시지 생성
    const emotionState = getEmotion(catStat.emotion);
    const ageGroup = getAgeGroup(catStat.growth);

    const carePrompt = buildCarePrompt({
      catName: cat.name,
      mood: emotionState.level,
      ageGroup,
      personality,
    });

    let message = "";

    try {
      const { text } = await claude.ask({
        maxOutputTokens: 120,
        ...carePrompt,
      });

      message = text.trim();
    } catch (error) {
      console.error("Error generating care message:", error);
      message = `${cat.name} enjoyed the care and purrs contentedly.`;
    }

    // 5) 돌봄 기록 생성
    this.careRecordRepository.create({
      catId: cat.id,
      emotionDelta: emotionPerCare,
      growthDelta: growthPerCare,
      servantId: userId,
      message,
    });

    return {
      growth: updatedCatStat.growth,
      emotion: updatedCatStat.emotion,
      message,
    };
  }
}
