import { cn } from '@/lib/utils';

export default function ScreenLayout({
  ref,
  children,
}: {
  ref?: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
}) {
  return (
    <div
      ref={ref}
      className={cn([
        'w-svw h-svh',
        'max-w-xl max-h-[1000px] mx-auto',
        'bg-screen overflow-x-hidden overflow-y-auto relative',
      ])}
    >
      {children}
    </div>
  );
}
