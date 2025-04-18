import { wagmiAdapter } from '@/provider/reown-appkit';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { getAccount } from '@wagmi/core';
import { useAccount } from 'wagmi';

export const Route = createFileRoute('/main')({
  component: RouteComponent,
  beforeLoad: async () => {
    const account = getAccount(wagmiAdapter.wagmiConfig);

    if (!account.isConnected) {
      console.error('Account is not connected');
      return redirect({
        to: '/',
      });
    }
  },
});

function RouteComponent() {
  const { address } = useAccount();
  return <div>Hello "/main"! {address}</div>;
}
