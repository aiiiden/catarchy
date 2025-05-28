import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PostVerifyDto {
  @ApiProperty({ example: '3489ufiahdjks' })
  @IsString()
  challengeId: string;

  @ApiProperty({ example: '0x1234…' })
  walletAddress: string;

  @ApiProperty({ example: '0xabcd…' })
  signature: string;
}
