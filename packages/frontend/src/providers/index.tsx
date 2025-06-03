import { RainbowKitProvider } from './rainbowkit';
import { SpriteProvider } from './sprite-provider';
import { TanstackQueryProvider } from './tanstack-query';

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <TanstackQueryProvider>
      <SpriteProvider />
      <RainbowKitProvider>{children}</RainbowKitProvider>
    </TanstackQueryProvider>
  );
}
