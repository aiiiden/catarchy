import { ReownAppkitProvider } from './reown-appkit';
import { SpriteProvider } from './sprite-provider';
import { TanstackQueryProvider } from './tanstack-query';

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ReownAppkitProvider>
      <SpriteProvider />
      <TanstackQueryProvider>{children}</TanstackQueryProvider>
    </ReownAppkitProvider>
  );
}
