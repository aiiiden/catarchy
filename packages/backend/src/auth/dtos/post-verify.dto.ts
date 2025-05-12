import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class PostVerifyDto {
  @ApiProperty({ example: 42 })
  @IsInt()
  challengeId: number;

  @ApiProperty({ example: '0x1234…' })
  walletAddress: string;

  @ApiProperty({ example: '0xabcd…' })
  signature: string;
}
