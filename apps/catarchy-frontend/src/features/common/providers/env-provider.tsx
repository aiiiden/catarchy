import { Text } from "../components/text";
import { envResult } from "../lib/env";

export function EnvProvider({ children }: { children: React.ReactNode }) {
  if (!envResult.success) {
    console.error("Environment variable validation failed:", envResult.errors);
    return (
      <div>
        <Text as="p">Invalid environment variables</Text>
      </div>
    );
  }

  return <>{children}</>;
}
