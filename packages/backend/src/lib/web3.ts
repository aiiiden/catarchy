import { Address, createPublicClient, http } from 'viem';
import { sepolia } from 'viem/chains';

export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});

export function getTypedData(params: {
  address: Address;
  nonce: `0x${string}`;
  issued: bigint;
}) {
  const domain = { name: 'Catarchy', version: '0.0.1' } as const;

  const types = {
    EIP712Domain: [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
    ],
    Verify: [
      { name: 'from', type: 'address' },
      { name: 'nonce', type: 'bytes32' },
      { name: 'issued', type: 'uint256' },
    ],
  } as const;

  const message = {
    from: params.address,
    nonce: params.nonce,
    issued: params.issued,
  } as const;

  return { domain, types, primaryType: 'Verify' as const, message };
}
