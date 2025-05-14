import PersonalityTest from '@/features/personality-test';
import { Story1, Story1Handle } from '@/features/story/1';
import { createFileRoute } from '@tanstack/react-router';
import { useRef } from 'react';

export const Route = createFileRoute('/signup')({
  component: RouteComponent,
});

function RouteComponent() {
  const storyRef = useRef<Story1Handle>(null);

  return (
    <div className="h-full">
      <Story1 ref={storyRef} className="z-10" />
      <PersonalityTest
        onDone={() => {
          storyRef.current?.resume();
        }}
      />
    </div>
  );
}
