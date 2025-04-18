import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { getTypedData, publicClient } from 'src/lib';

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService) {}

  async signup(signature: string, walletAddress: string, handle: string) {
    const valid = await this.verifySignature(signature, walletAddress);

    if (!valid) {
      throw new MethodNotAllowedException('Failed to verify signature');
    }

    await this.databaseService.user.create({
      data: {
        walletAddress: walletAddress.toLowerCase(),
        handle,
      },
    });
  }

  async verifySignature(
    signature: string,
    walletAddress: string,
  ): Promise<boolean> {
    let valid = false;

    const typedData = getTypedData({
      address: walletAddress,
    });

    try {
      const result = await publicClient.verifyTypedData({
        address: walletAddress.toLowerCase() as `0x${string}`,
        signature: signature as `0x${string}`,
        ...typedData,
      });

      valid = result;
    } catch {
      valid = false;
    }

    return valid;
  }

  async getAllUsers() {
    const users = await this.databaseService.user.findMany({
      select: {
        id: true,
        handle: true,
        walletAddress: true,
      },
    });

    return users;
  }
}
