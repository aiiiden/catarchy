import PersonalityTest from '@/features/personality-test';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/signup')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <PersonalityTest />
    </div>
  );
}
