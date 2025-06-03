export function generateTypedData({
  address,
  nonce,
  issuedAt,
}: {
  address: `0x${string}`;
  nonce: string;
  issuedAt: number;
}) {
  return {
    types: {
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
      ],
      Verify: [
        { name: 'from', type: 'address' },
        { name: 'purpose', type: 'string' },
        { name: 'nonce', type: 'string' },
        { name: 'issued', type: 'uint256' },
      ],
    },
    domain: {
      name: 'Catarchy',
      version: '0.0.1',
    },
    primaryType: 'Verify',
    message: {
      from: address.toLowerCase() as `0x${string}`,
      purpose:
        'We need your signature to verify that this wallet address is yours. Please sign this message to continue. This is not a transaction and will not cost you any gas.',
      nonce: nonce,
      issued: BigInt(Math.floor(issuedAt / 1000)),
      // issued: BigInt(Math.floor(issuedAt / 1000)).toString(),
    },
  } as const;
}
