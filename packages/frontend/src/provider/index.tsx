import { TanstackQueryProvider } from './tanstack-query';

export default function Provider({ children }: { children: React.ReactNode }) {
  return <TanstackQueryProvider>{children}</TanstackQueryProvider>;
}
