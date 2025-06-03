import { Button } from '@/components/ui/button';
import { getChallenge, useSignIn } from '@/requests/auth';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useCallback } from 'react';
import { useAccount, useSignTypedData } from 'wagmi';
import { generateTypedData } from './util';
import { useAuth } from '@/stores/auth';
import { useNavigate } from '@tanstack/react-router';

export default function LogInButton() {
  const naviagate = useNavigate();
  const { isConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { signTypedDataAsync } = useSignTypedData();
  const { setAuth } = useAuth();

  const handleClick = useCallback(() => {
    console.log('isConnected', isConnected);
    openConnectModal?.();
  }, [openConnectModal]);

  const { mutateAsync: signIn } = useSignIn();

  const handleSignMessage = useCallback(async () => {
    const { nonce, issuedAt, challengeId } = await getChallenge({
      walletAddress: address!,
    });

    if (!nonce) {
      alert('Failed to get nonce');
      return;
    }

    const typed = generateTypedData({
      address: address!.toLowerCase() as `0x${string}`,
      nonce,
      issuedAt,
    });

    console.log('typed', typed);

    const signature = await signTypedDataAsync(typed);

    const { token, user } = await signIn({
      walletAddress: address!.toLowerCase() as `0x${string}`,
      signature: signature as `0x${string}`,
      challengeId,
    });

    setAuth({ token });

    if (!user.handle) {
      naviagate({
        to: '/signup',
      });

      return;
    }

    naviagate({
      to: '/main',
    });
  }, [address]);

  return (
    <Button
      onClick={isConnected ? handleSignMessage : handleClick}
      className="w-full"
    >
      {isConnected ? 'Sign Message' : 'Log in'}
    </Button>
  );
}
