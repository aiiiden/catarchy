import { createRootRoute, Outlet } from '@tanstack/react-router';
import Provider from '@/provider';
import ScreenLayout from '@/components/layout/screen-layout';

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <div>404 Not Found</div>,
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
