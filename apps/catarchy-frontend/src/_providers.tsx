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
        <TanstackQueryProvider>
          <NotificationProvider>
            <KeyboardProvider>{children}</KeyboardProvider>
          </NotificationProvider>
        </TanstackQueryProvider>
      </FirebaseProvider>
    </EnvProvider>
  );
}
