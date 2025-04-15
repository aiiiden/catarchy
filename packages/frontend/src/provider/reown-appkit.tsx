import { WagmiProvider } from 'wagmi';
import { AppKitNetwork, sepolia } from '@reown/appkit/networks';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { createAppKit } from '@reown/appkit/react';

const projectId = import.meta.env.VITE_REOWN_APPKIT_PROJECT_ID;

const metadata = {
  name: 'Catarchy',
  description: 'Be cat, be saved',
  url: '',
  icons: [],
};

export const networks = [sepolia] as [AppKitNetwork, ...AppKitNetwork[]];

const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks,
  ssr: false,
});

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  defaultNetwork: sepolia,
  projectId,
  metadata,
  features: {
    analytics: true,
  },
});

export function ReownAppkitProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>{children}</WagmiProvider>
  );
}
