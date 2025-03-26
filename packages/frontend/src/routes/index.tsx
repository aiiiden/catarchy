import { Cat } from '@/components/character/cat';
import { withFadeTransition } from '@/lib/hoc/with-fade-transition';
import { Button } from '@/components/ui/button';
import { createFileRoute } from '@tanstack/react-router';
import BottomSheet from '@/components/layout/sheet';
import { useState } from 'react';
import { AnimatePresence } from 'motion/react';

export const Route = createFileRoute('/')({
  component: withFadeTransition(RouteComponent, {
    duration: 0.5,
  }),
});

function RouteComponent() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);

  return (
    <div className="p-6 flex flex-col h-full gap-6">
      <div className="flex-grow flex items-center justify-center flex-col gap-4">
        <Cat />
        <h1 className="text-3xl font-bold">CATARCHY</h1>
        <p>Ver.alpha</p>
      </div>

      <Button size="lg" onClick={() => setIsBottomSheetOpen(true)}>
        Start
      </Button>

      <AnimatePresence>
        {isBottomSheetOpen && (
          <BottomSheet key={new Date().getTime()}>
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold">About</h2>
              <p>
                This is a game where you can collect cats and build your own
                kingdom.
              </p>
              <Button onClick={() => setIsBottomSheetOpen(false)}>Close</Button>
            </div>
          </BottomSheet>
        )}
      </AnimatePresence>
    </div>
  );
}
