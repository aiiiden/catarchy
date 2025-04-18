import { ApiProperty } from '@nestjs/swagger';

export class PostVerifySignatureDto {
  @ApiProperty()
  walletAddress: string;

  @ApiProperty()
  signature: string;
}
