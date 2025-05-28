// src/system/dto/upsert-policy.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpsertPolicyDto {
  @ApiProperty({ example: 'emotion' })
  @IsString()
  key: string;

  @ApiProperty({
    example: { decayIntervalH: 6, decayValue: 10 },
    type: Object,
  })
  value: any;
}
