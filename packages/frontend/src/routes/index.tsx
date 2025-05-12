import { withFadeTransition } from '@/lib/hoc/with-fade-transition';
import { createFileRoute } from '@tanstack/react-router';

import LogInButton from '@/features/auth/log-in-button';
import SpriteImage from '@/components/ui/sprite-image';

export const Route = createFileRoute('/')({
  component: withFadeTransition(RouteComponent, {
    duration: 0.5,
  }),
});

function RouteComponent() {
  return (
    <main className="flex flex-col h-full relative">
      <div className="relative flex-grow p-4 overflow-y-auto flex flex-col justify-center items-center">
        <header className="space-y-4 z-10 relative">
          <div className="space-y-4" role="img" aria-label="logo">
            <SpriteImage
              id="cat/cat-3"
              width={76}
              height={60}
              className="block mx-auto"
            />
            <SpriteImage id="logo/typo" className="block mx-auto" />
            <h1 className="sr-only">Catarchy</h1>
          </div>
        </header>

        <p className="text-center">Ver 0.0.1</p>
      </div>

      <footer className="bg-white z-20 px-4 pt-2 pb-5 border-t-2 border-t-gray-extralight">
        <LogInButton />
      </footer>
    </main>
  );
}
