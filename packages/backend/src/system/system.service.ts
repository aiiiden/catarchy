// src/system/system.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SystemService {
  constructor(private db: DatabaseService) {}

  /** 단일 정책 조회 */
  async getPolicy(key: string) {
    const row = await this.db.systemPolicy.findUnique({ where: { key } });
    if (!row) throw new NotFoundException(`Policy "${key}" not found`);
    return row;
  }

  /** upsert */
  async upsertPolicy(key: string, value: any) {
    return this.db.systemPolicy.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }
}
