import { ReownAppkitProvider } from './reown-appkit';
import { TanstackQueryProvider } from './tanstack-query';

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ReownAppkitProvider>
      <TanstackQueryProvider>{children}</TanstackQueryProvider>
    </ReownAppkitProvider>
  );
}
