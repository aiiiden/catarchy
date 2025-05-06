import { wagmiAdapter } from '@/providers/reown-appkit';
import { useAppKit } from '@reown/appkit/react';
import { getAccount, GetAccountReturnType, getConnections } from '@wagmi/core';
import { useEffect, useRef, useState } from 'react';

export type ConnectState = 'pending' | 'success' | 'error' | 'idle';

export default function useWallet() {
  const appkit = useAppKit();

  const intervalRef = useRef<NodeJS.Timeout | number | null>(null);
  const [state, setState] = useState<ConnectState>('idle');
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  async function connectAsync() {
    setState('pending');

    const isConnected = getConnections(wagmiAdapter.wagmiConfig).length > 0;

    if (isConnected) {
      setState('success');
      return getAccount(wagmiAdapter.wagmiConfig);
    }

    await appkit.open({
      view: 'Connect',
    });

    return new Promise<GetAccountReturnType>((resolve) => {
      intervalRef.current = setInterval(() => {
        const account = getAccount(wagmiAdapter.wagmiConfig);
        if (account.isConnected) {
          clearInterval(intervalRef.current!);
          setState('success');
          resolve(account);
        }
      }, 500);
    }).catch((err) => {
      setState('error');
      setError(err);
      return Promise.reject(err);
    });
  }

  return { state, error, connectAsync };
}
