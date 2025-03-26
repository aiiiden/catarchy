import { Cat } from '@/components/character/cat';
import { withFadeTransition } from '@/lib/hoc/with-fade-transition';
import { Button } from '@/components/ui/button';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: withFadeTransition(RouteComponent, {
    duration: 0.5,
  }),
});

function RouteComponent() {
  return (
    <div className="p-6 flex flex-col h-full gap-6">
      <div className="flex-grow flex items-center justify-center flex-col gap-4">
        <Cat />
        <h1 className="text-3xl font-bold">CATARCHY</h1>
        <p>Ver.alpha</p>
      </div>

      <Button size="lg">Start</Button>
    </div>
  );
}
