export function generateTypedData({
  address,
}: {
  address: `0x${string}`;
  nonce?: string;
}) {
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
      version: '0.0.1',
    },
    primaryType: 'Verify',
    message: {
      from: address.toLowerCase() as `0x${string}`,
      // TODO: add nonce
      // nonce: nonce,
    },
  } as const;
}
