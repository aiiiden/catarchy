import { LogoCat, LogoTitle } from '@/components/ui/logo';
import { withFadeTransition } from '@/lib/hoc/with-fade-transition';
import { createFileRoute } from '@tanstack/react-router';

import LogInButton from '@/features/auth/log-in-button';

export const Route = createFileRoute('/')({
  component: withFadeTransition(RouteComponent, {
    duration: 0.5,
  }),
});

function RouteComponent() {
  return (
    <main className="flex flex-col h-full relative">
      <div className="absolute inset-0 bg-cat-pattern z-0 opacity-10" />
      <div className="relative flex-grow p-4 overflow-y-auto flex flex-col justify-center items-center">
        <header className="space-y-4 z-10 relative">
          <div className="space-y-4" role="img" aria-label="logo">
            <LogoCat width={76} height={60} className="mx-auto" />
            <LogoTitle width={64 * 2} height={10 * 2} className="mx-auto" />
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
