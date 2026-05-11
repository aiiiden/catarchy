import {
  ClientError,
  ServerConnectionError,
} from "@/features/common/lib/error";
import { toast } from "@/features/common/stores/toast";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const handleGlobalError = (error: unknown) => {
  if (error instanceof ServerConnectionError) {
    toast.push(error.message, { id: "server-connection-error" });
    return;
  }

  if (error instanceof ClientError) {
    toast.push(error.message, { id: "client-error" });
  }
};

export const queryClient = new QueryClient({
  queryCache: new QueryCache({ onError: handleGlobalError }),
  mutationCache: new MutationCache({ onError: handleGlobalError }),
});

export function TanstackQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
