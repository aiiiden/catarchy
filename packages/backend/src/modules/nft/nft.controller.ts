import { Controller, Get, Param } from '@nestjs/common';
import { NftService } from './nft.service';

@Controller('nft')
export class NftController {
  constructor(private readonly nftService: NftService) {}

  @Get('metadata/:tokenId')
  async getNfts(@Param('tokenId') tokenId: string) {
    return this.nftService.getNftMetadata(tokenId);
  }
}
