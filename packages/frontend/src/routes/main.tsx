import SpriteImage from '@/components/ui/sprite-image';
import CatScreen from '@/features/cat-screen';
import { createFileRoute, redirect } from '@tanstack/react-router';

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
    <div className="h-full">
      <div className="relative h-1/2 min-h-[300px] flex flex-col gap-0">
        <div className="bg-pattern-cat absolute inset-0 opacity-30"></div>
        <header className="px-4 py-3.5 flex justify-center items-center">
          <SpriteImage id="logo/typo" alt="CATARCHY" />
        </header>
        <div className="h-full flex flex-col justify-center items-center z-10">
          <div className="bg-white w-[260px] h-[220px] border box-content flex flex-col">
            <div className="flex justify-between px-2 border-b h-[20px] leading-4 pt-0.5 pb-px">
              <span>😊</span>
              <span>🎂3.08</span>
              <span>💰1K</span>
            </div>
            <CatScreen />
          </div>
        </div>
      </div>
    </div>
  );
}
