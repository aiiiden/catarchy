import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';

export class PostChallengeDto {
  @ApiProperty({ example: '0x1234…' })
  @Matches(/^0x[a-fA-F0-9]{40}$/)
  walletAddress: string;
}
