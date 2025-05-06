import { createRootRoute, Outlet } from '@tanstack/react-router';
import Provider from '@/providers';
import ScreenLayout from '@/components/layout/screen-layout';
import { getAuth } from '@/stores/auth';

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <div>404 Not Found</div>,
  context() {
    const auth = getAuth();

    return {
      auth,
    };
  },
});

function RootComponent() {
  return (
    <Provider>
      <ScreenLayout>
        <Outlet />
      </ScreenLayout>
    </Provider>
  );
}
