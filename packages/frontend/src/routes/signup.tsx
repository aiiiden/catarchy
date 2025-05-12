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
    <div>
      <Story1 ref={storyRef} />
      <button onClick={() => storyRef.current?.resume()}>
        애니메이션 이어서 실행
      </button>
      <PersonalityTest />
    </div>
  );
}
