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
  const { isConnected, status } = useAppKitAccount();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (opened && status === 'connected') {
      router.navigate({
        to: '/main',
      });
    }
  }, [status, opened]);

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
      <div className="flex-grow flex items-center justify-safe-center flex-col gap-4">
        <Cat />
        <h1 className="text-3xl font-bold">CATARCHY</h1>
        <p>Ver.alpha</p>
      </div>

      <Button className="w-full" onClick={handleLogin}>
        Log in
      </Button>
    </div>
  );
}
