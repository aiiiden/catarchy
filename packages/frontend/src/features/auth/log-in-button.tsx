import { Button } from '@/components/ui/button';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import { useCallback } from 'react';
import { useDisconnect, useSignTypedData } from 'wagmi';
import useWallet from './use-wallet';
import { generateTypedData } from './util';
import { signIn } from '@/requests/auth';
import { setAuth } from '@/stores/auth';
import { useRouter } from '@tanstack/react-router';

export default function LogInButton() {
  const router = useRouter();
  const account = useAppKitAccount();
  const appkit = useAppKit();

  const { disconnectAsync } = useDisconnect();
  const { connectAsync } = useWallet();
  const { signTypedDataAsync } = useSignTypedData();

  const handleClick = useCallback(async () => {
    if (account.isConnected) {
      await disconnectAsync();
    }

    const connection = await connectAsync();

    if (!connection) {
      console.error('Failed to connect');
      return;
    }

    const { address } = connection;

    const typedData = generateTypedData({
      address: address!,
    });

    const signature = await signTypedDataAsync(typedData);

    if (!signature) {
      console.error('Failed to sign typed data');
      return;
    }

    const { accessToken } = await signIn({
      address: address!,
      signature,
    });

    if (!accessToken) {
      console.error('Failed to get access token');
      return;
    }

    setAuth({
      token: accessToken,
    });

    await router.invalidate();

    await router.navigate({
      to: '/main',
    });
  }, [account, appkit]);

  return (
    <Button className="w-full font-bold text-base" onClick={handleClick}>
      Log in
    </Button>
  );
}
