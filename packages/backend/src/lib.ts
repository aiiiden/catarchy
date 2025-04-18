import { createPublicClient, http } from 'viem';
import { sepolia } from 'viem/chains';

/**
 * Web3
 */
export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});

export function getTypedData({ address }: { address: string }) {
  return {
    types: {
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
      ],
      Verify: [
        { name: 'from', type: 'address' },
        // TODO: add nonce
        // { name: 'nonce', type: 'string' },
      ],
    },
    domain: {
      name: 'Catarchy',
      version: '1.0',
    },
    primaryType: 'Verify',
    message: {
      from: address as `0x${string}`,
    },
  };
}
