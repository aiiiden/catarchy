import { generateTypedData } from '@/features/auth/util';
import { ServerError } from '@/lib/error';
import { sleep } from '@/lib/time';
import { wagmiAdapter } from '@/providers/reown-appkit';
import { useMutation } from '@tanstack/react-query';
import { verifyTypedData } from '@wagmi/core';

export interface SignInPayload {
  address: `0x${string}`;
  signature: `0x${string}`;
}

export async function signIn({
  address,
  signature,
}: {
  address: `0x${string}`;
  signature: `0x${string}`;
}) {
  // TODO: API call
  await sleep(1);

  if (!address) {
    throw new ServerError(400, 'Address is required');
  }

  if (!signature) {
    throw new ServerError(400, 'Signature is required');
  }

  const typedData = generateTypedData({
    address,
  });

  const isValid = verifyTypedData(wagmiAdapter.wagmiConfig, {
    address: address,
    signature: signature,
    ...typedData,
  });

  if (!isValid) {
    throw new ServerError(400, 'Signature is invalid');
  }

  return {
    accessToken: 'MOCK_ACCESS_TOKEN',
  };
}

export function useSignIn() {
  return useMutation({
    mutationFn: (payload: SignInPayload) => signIn(payload),
    mutationKey: ['auth', 'signIn'],
  });
}
