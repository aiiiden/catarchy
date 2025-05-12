import SpriteImage from '@/components/ui/sprite-image';
import { createFileRoute, redirect } from '@tanstack/react-router';

import { useAccount } from 'wagmi';

export const Route = createFileRoute('/main')({
  component: RouteComponent,
  beforeLoad(ctx) {
    const { auth } = ctx.context;

    // TODO: Mock logic
    if (!auth.token) {
      console.log('Redirecting to login');
      return redirect({
        to: '/',
      });
    }
  },

  loader(ctx) {
    return ctx.context;
  },
});

function RouteComponent() {
  return (
    <div>
      <SpriteImage id="story/1/1" />
    </div>
  );
}
