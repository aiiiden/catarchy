import { Cat } from '@/components/character/cat';
import { withFadeTransition } from '@/lib/hoc/with-fade-transition';
import { createFileRoute, useRouter } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';
import {
  useAppKit,
  useAppKitAccount,
  useDisconnect,
} from '@reown/appkit/react';
import { useCallback, useEffect, useState } from 'react';
import { useAccount, useSignTypedData } from 'wagmi';

export const Route = createFileRoute('/')({
  component: withFadeTransition(RouteComponent, {
    duration: 0.5,
  }),
  beforeLoad: () => {},
});

function RouteComponent() {
  const router = useRouter();
  const [opened, setOpened] = useState<boolean>(false);
  const { open } = useAppKit();
  const { address, chainId } = useAccount();
  const { isConnected, status } = useAppKitAccount();
  const { disconnect } = useDisconnect();
  const { signTypedData, data: signature } = useSignTypedData();

  useEffect(() => {
    if (!address || !chainId) {
      return;
    }

    if (opened && status === 'connected') {
      signTypedData({
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
          from: address.toLowerCase() as `0x${string}`,
          // TODO: add nonce
          // nonce: nonce,
        },
      });
    }
  }, [status, opened, address, chainId]);

  useEffect(() => {
    if (signature) {
      // ..
    }
  }, [signature]);

  const handleLogin = useCallback(async () => {
    if (isConnected) {
      await disconnect();
    }

    setOpened(true);

    await open({
      view: 'Connect',
    });
  }, [isConnected]);

  return (
    <div className="p-6 flex flex-col h-full gap-6">
      <div className="flex-grow flex items-center-safe justify-center-safe flex-col gap-4">
        <Cat />
        <h1 className="text-3xl font-bold">CATARCHY</h1>
        <p>Ver.alpha</p>
        <p>{signature}</p>
        <p>{address}</p>
      </div>

      <Button className="w-full" onClick={handleLogin}>
        Log in
      </Button>
    </div>
  );
}
