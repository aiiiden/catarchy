import { Outlet, createRootRoute } from '@tanstack/react-router';
import Provider from '../provider';

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <div>404 Not Found</div>,
});

function RootComponent() {
  return (
    <Provider>
      <Outlet />
    </Provider>
  );
}
