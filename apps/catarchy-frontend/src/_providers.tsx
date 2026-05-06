import { AnalyticsProvider } from "./features/analytics";
import {
  EnvProvider,
  FirebaseProvider,
  KeyboardProvider,
  TanstackQueryProvider,
} from "./features/common";
import { NotificationProvider } from "./features/notification";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <EnvProvider>
      <FirebaseProvider>
        <AnalyticsProvider>
          <TanstackQueryProvider>
            <NotificationProvider>
              <KeyboardProvider>{children}</KeyboardProvider>
            </NotificationProvider>
          </TanstackQueryProvider>
        </AnalyticsProvider>
      </FirebaseProvider>
    </EnvProvider>
  );
}
