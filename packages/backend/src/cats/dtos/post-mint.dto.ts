import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PostMintDto {
  @ApiProperty({ example: '1234567890123456789' })
  @IsString()
  tokenId: string;

  @ApiProperty({ example: '192837465' })
  @IsString()
  birthBlock: string;

  @ApiProperty({ example: '0xabc123…', minLength: 66, maxLength: 66 })
  @IsString()
  mintTx: string;
}
