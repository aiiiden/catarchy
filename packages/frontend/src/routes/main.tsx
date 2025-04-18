import { wagmiAdapter } from '@/provider/reown-appkit';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { getAccount } from '@wagmi/core';

export const Route = createFileRoute('/main')({
  component: RouteComponent,
  beforeLoad: async () => {},
  loader() {
    const account = getAccount(wagmiAdapter.wagmiConfig);

    if (!account.isConnected) {
      console.error('Account is not connected');
      return redirect({
        to: '/',
      });
    }

    return { account };
  },
});

function RouteComponent() {
  return (
    <div>
      Hello "/main"! <p className="break-all w-full"></p>
    </div>
  );
}
