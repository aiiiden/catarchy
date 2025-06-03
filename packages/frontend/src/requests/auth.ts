import { useMutation } from '@tanstack/react-query';

import { fetcher } from './fetcher';

export async function getChallenge({
  walletAddress,
}: {
  walletAddress: `0x${string}`;
}) {
  const nonce = await fetcher<{
    nonce: string;
    issuedAt: number;
    challengeId: string;
  }>('/auth/challenge', {
    method: 'POST',
    body: JSON.stringify({
      walletAddress,
    }),
  });

  return nonce;
}

export interface SignInPayload {
  walletAddress: `0x${string}`;
  signature: `0x${string}`;
  challengeId?: string;
}

export interface SignInResponse {
  token: string;
  user: {
    id: number;
    walletAddress: `0x${string}`;
    handle: string | null;
  };
}

export async function signIn({
  walletAddress,
  signature,
  challengeId,
}: SignInPayload) {
  const data = await fetcher<SignInResponse>('/auth/verify', {
    method: 'POST',
    body: JSON.stringify({
      walletAddress: walletAddress.toLowerCase(),
      signature,
      challengeId,
    }),
  });

  return data;
}

export function useSignIn() {
  return useMutation({
    mutationFn: (payload: SignInPayload) => signIn(payload),
    mutationKey: ['auth', 'signIn'],
  });
}
