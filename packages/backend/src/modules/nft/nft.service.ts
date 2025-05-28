import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@providers/database/database.service';

@Injectable()
export class NftService {
  constructor(private readonly db: DatabaseService) {}

  public async getNftMetadata(tokenId: string) {
    let tokenMetadata = {
      description: 'Catarchy',
      external_url: 'https://catarchy.io',
      image: 'https://catarchy.io/catarchy.png',
      name: 'Catarchy',
      attributes: [] as { trait_type: string; value: any }[],
    };

    const cat = await this.db.cat.findUnique({
      where: {
        tokenId: BigInt(tokenId),
      },
      include: {
        user: {
          select: {
            handle: true,
            walletAddress: true,
          },
        },
      },
    });

    if (!cat) {
      return tokenMetadata;
    }

    tokenMetadata.attributes = [
      {
        trait_type: 'Owner Handle',
        value: cat.user?.handle,
      },
      {
        trait_type: 'Owner Wallet Address',
        value: cat.user?.walletAddress,
      },
      {
        trait_type: 'Token ID',
        value: tokenId,
      },
      {
        trait_type: 'Expression',
        value: cat.expression,
      },
      {
        trait_type: 'Empathy',
        value: cat.empathy,
      },
      {
        trait_type: 'Intellect',
        value: cat.intellect,
      },
      {
        trait_type: 'Charisma',
        value: cat.charisma,
      },
      {
        trait_type: 'Willpower',
        value: cat.willpower,
      },
      {
        trait_type: 'Passion',
        value: cat.passion,
      },
      {
        trait_type: 'Integrity',
        value: cat.integrity,
      },
      {
        trait_type: 'Instinct',
        value: cat.instinct,
      },
      {
        trait_type: 'Age',
        value: (cat.growth / 12).toFixed(2),
      },
    ];

    return tokenMetadata;
  }
}
