import { ApiProperty } from '@nestjs/swagger';

export class PostSignupDto {
  @ApiProperty()
  walletAddress: string;

  @ApiProperty()
  signature: string;

  @ApiProperty()
  handle: string;
}
